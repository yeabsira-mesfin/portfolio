import os
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = os.environ.get("PORTFOLIO_QA_URL", "http://127.0.0.1:4173").rstrip("/")
OUT = Path(os.environ.get("PORTFOLIO_QA_OUT", "qa-screenshots"))
OUT.mkdir(parents=True, exist_ok=True)


def browser(width, height):
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f"--window-size={width},{height}")
    options.add_argument("--force-device-scale-factor=1")
    driver = webdriver.Chrome(options=options)
    driver.set_window_size(width, height)
    return driver


def hint_visible(driver):
    return driver.execute_script(
        """
        const p = [...document.querySelectorAll('[data-portfolio-assistant-launcher] p')]
          .find(el => el.offsetParent !== null);
        return !!p;
        """
    )


def test_mobile_hint():
    driver = browser(390, 844)
    try:
        driver.get(f"{BASE_URL}/#projects")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-project-scene="true"]')))
        WebDriverWait(driver, 10).until(lambda d: hint_visible(d))
        time.sleep(2.1)

        # Chrome headless can report a zero document scroll range for this SPA even
        # when the mobile scene is visually taller than the viewport. Override only
        # the scrollY getter for this isolated browser session, then dispatch the same
        # scroll events the real page receives. This exercises the component's actual
        # direction logic without depending on headless layout quirks.
        driver.execute_script(
            """
            window.__qaScrollY = 0;
            Object.defineProperty(window, 'scrollY', {
              configurable: true,
              get: () => window.__qaScrollY
            });
            window.dispatchEvent(new Event('scroll'));
            """
        )
        time.sleep(0.1)

        driver.execute_script(
            """
            window.__qaScrollY = 240;
            window.dispatchEvent(new Event('scroll'));
            """
        )
        WebDriverWait(driver, 4).until(lambda d: not hint_visible(d))

        driver.execute_script(
            """
            window.__qaScrollY = 80;
            window.dispatchEvent(new Event('scroll'));
            """
        )
        WebDriverWait(driver, 4).until(lambda d: hint_visible(d))

        driver.save_screenshot(str(OUT / "polish-phone-hint-scroll.png"))
    finally:
        driver.quit()


def test_assistant_keyboard():
    driver = browser(1366, 768)
    try:
        driver.get(BASE_URL)
        launcher = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[aria-label="Open portfolio assistant"]')))
        driver.execute_script("arguments[0].click();", launcher)
        dialog = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[role="dialog"]')))
        if not dialog.get_attribute("aria-labelledby"):
            raise AssertionError("assistant dialog is missing an accessible label relationship")
        driver.switch_to.active_element.send_keys(Keys.ESCAPE)
        WebDriverWait(driver, 10).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, '[role="dialog"]')))
        driver.save_screenshot(str(OUT / "polish-laptop-assistant-escape.png"))
    finally:
        driver.quit()


def test_direct_routes_and_resume():
    driver = browser(1366, 768)
    try:
        for scene in ("story", "projects", "contact"):
            driver.get(f"{BASE_URL}/#{scene}")
            WebDriverWait(driver, 10).until(
                lambda d: d.execute_script(
                    "return [...document.querySelectorAll('header nav button')].some(el => el.getAttribute('aria-current') === 'page' && el.textContent.trim().toLowerCase() === arguments[0]);",
                    scene,
                )
            )

        driver.get(f"{BASE_URL}/resume.html")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        body = driver.find_element(By.TAG_NAME, "body").text
        for required in ("Yeabsira Mesfin", "Print / Save PDF", "AppSec Vulnerability Manager", "The George Washington University"):
            if required not in body:
                raise AssertionError(f"resume page missing: {required}")
        driver.save_screenshot(str(OUT / "polish-resume-page.png"))
    finally:
        driver.quit()


tests = [test_mobile_hint, test_assistant_keyboard, test_direct_routes_and_resume]
failures = []
for test in tests:
    try:
        test()
        print(f"PASS {test.__name__}")
    except Exception as exc:
        failures.append(f"{test.__name__}: {type(exc).__name__}: {exc}")

if failures:
    raise SystemExit("Portfolio polish QA failed:\n" + "\n".join(failures))

print("Portfolio polish QA passed: mobile hint behavior, keyboard close, direct routes, and recruiter resume are working.")
