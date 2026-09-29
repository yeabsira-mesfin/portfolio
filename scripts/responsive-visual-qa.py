import os
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = os.environ.get("PORTFOLIO_QA_URL", "http://127.0.0.1:4173").rstrip("/")
OUT = Path(os.environ.get("PORTFOLIO_QA_OUT", "qa-screenshots"))
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    (390, 844, "phone"),
    (768, 1024, "tablet"),
    (1366, 768, "laptop"),
    (1920, 1080, "monitor"),
]
SCENES = ["intro", "story", "projects", "contact"]


def no_horizontal_overflow(driver, label):
    values = driver.execute_script("return {w: document.documentElement.scrollWidth, vw: window.innerWidth};")
    if values["w"] > values["vw"] + 3:
        raise AssertionError(f"{label}: horizontal overflow detected ({values['w']} > {values['vw']})")


def visible(driver, selector):
    return driver.execute_script(
        """
        const el = document.querySelector(arguments[0]);
        if (!el || el.offsetParent === null) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
        """,
        selector,
    )


def open_scene(driver, scene):
    suffix = "" if scene == "intro" else f"#{scene}"
    driver.get(f"{BASE_URL}/{suffix}")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "header")))

    selectors = {
        "intro": "h1",
        "story": '[data-story-content="true"]',
        "projects": '[data-project-scene="true"]',
        "contact": '[data-contact-content="true"]',
    }
    WebDriverWait(driver, 10).until(lambda d: visible(d, selectors[scene]))
    time.sleep(0.35)


def active_nav_label(driver):
    return driver.execute_script(
        """
        const active = [...document.querySelectorAll('header nav button')]
          .find(el => el.getAttribute('aria-current') === 'page');
        return active ? active.textContent.trim().toLowerCase() : null;
        """
    )


def assistant_overlaps_interactive(driver):
    return driver.execute_script(
        """
        const launcher = document.querySelector('button[aria-label="Open portfolio assistant"]');
        if (!launcher || launcher.offsetParent === null) return null;
        const lr = launcher.getBoundingClientRect();
        const controls = [...document.querySelectorAll('main a, main button')]
          .filter(el => el !== launcher)
          .filter(el => el.offsetParent !== null)
          .filter(el => {
            const r = el.getBoundingClientRect();
            return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
          });
        const hit = controls.find(el => {
          const r = el.getBoundingClientRect();
          return !(lr.right <= r.left || lr.left >= r.right || lr.bottom <= r.top || lr.top >= r.bottom);
        });
        if (!hit) return null;
        const r = hit.getBoundingClientRect();
        return {
          text:(hit.innerText || hit.getAttribute('aria-label') || '').trim().slice(0,80),
          rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom},
          launcher:{left:lr.left,top:lr.top,right:lr.right,bottom:lr.bottom}
        };
        """
    )


def check_intro(driver, width):
    if not visible(driver, "h1"):
        raise AssertionError("intro heading is not visible")
    if not visible(driver, 'a[href="/resume.html"]'):
        raise AssertionError("intro resume link is missing")
    if width <= 639:
        state = driver.execute_script(
            """
            const content = document.querySelector('[data-intro-content="true"]');
            const gear = document.querySelector('svg[viewBox="0 0 600 600"]')?.closest('div.relative');
            if (!content || !gear) return null;
            const c = content.getBoundingClientRect();
            const g = gear.getBoundingClientRect();
            return {contentTop:c.top, gearTop:g.top};
            """
        )
        if state and state["gearTop"] < state["contentTop"]:
            raise AssertionError(f"mobile intro should lead with recruiter copy before the gear: {state}")


def check_story(driver, width):
    content = driver.execute_script(
        """
        const el = document.querySelector('[data-story-content="true"]');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return {width:r.width, overflowY:style.overflowY, clientHeight:el.clientHeight, scrollHeight:el.scrollHeight};
        """
    )
    if not content:
        raise AssertionError("story content marker missing")
    if content["overflowY"] in ("auto", "scroll"):
        raise AssertionError(f"story still has nested vertical scrolling: {content}")
    if width <= 639 and content["width"] < width * 0.78:
        raise AssertionError(f"mobile story content is too narrow: {content['width']}px at {width}px viewport")
    if not driver.find_elements(By.XPATH, "//*[contains(text(),'Software engineer with systems instincts')]"):
        raise AssertionError("story card content missing")


def check_projects(driver):
    if not visible(driver, '[data-project-controls="true"]'):
        raise AssertionError("project controls missing")
    if not visible(driver, '[data-project-gear="true"]'):
        raise AssertionError("project mechanism missing")

    scroll_state = driver.execute_script(
        """
        const root = document.querySelector('[data-project-controls="true"] > div:last-child');
        if (!root) return null;
        const style = getComputedStyle(root);
        return {overflowY:style.overflowY, clientHeight:root.clientHeight, scrollHeight:root.scrollHeight};
        """
    )
    if scroll_state and scroll_state["overflowY"] in ("auto", "scroll"):
        raise AssertionError(f"project controls still use nested scrolling: {scroll_state}")

    buttons = driver.find_elements(By.CSS_SELECTOR, '[data-project-controls="true"] button')
    if len(buttons) < 7:
        raise AssertionError(f"expected at least 7 project choices, found {len(buttons)}")

    windows = next((b for b in buttons if "Windows Infrastructure" in b.text), None)
    if windows is None:
        raise AssertionError("Windows Infrastructure project choice missing")
    driver.execute_script("arguments[0].click();", windows)
    WebDriverWait(driver, 7).until(lambda d: "Windows Infrastructure Reliability Console" in d.find_element(By.CSS_SELECTOR, '[data-project-card="true"]').text)
    if windows.get_attribute("aria-pressed") != "true":
        raise AssertionError("selected project does not expose aria-pressed=true")


def check_contact(driver):
    required = [
        'a[href="mailto:yeabsira.mesfin29@gmail.com"]',
        'a[href*="linkedin.com/in/yeabsira-mesfin"]',
        'a[href="https://github.com/yeabsira-mesfin"]',
        'a[href="/resume.html"]',
    ]
    for selector in required:
        if not visible(driver, selector):
            raise AssertionError(f"contact action missing or hidden: {selector}")


def check_assistant(driver):
    launcher = WebDriverWait(driver, 7).until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[aria-label="Open portfolio assistant"]')))
    driver.execute_script("arguments[0].click();", launcher)
    WebDriverWait(driver, 7).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[role="dialog"]')))
    input_el = driver.find_element(By.ID, "portfolio-assistant-input")
    input_el.send_keys("Hi")
    input_el.submit()
    WebDriverWait(driver, 7).until(lambda d: "engineering background" in d.find_element(By.CSS_SELECTOR, '[role="dialog"]').text)
    close = driver.find_element(By.CSS_SELECTOR, 'button[aria-label="Close portfolio assistant"]')
    driver.execute_script("arguments[0].click();", close)
    WebDriverWait(driver, 7).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, '[role="dialog"]')))


def run_viewport(width, height, name):
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f"--window-size={width},{height}")
    options.add_argument("--force-device-scale-factor=1")

    driver = webdriver.Chrome(options=options)
    failures = []
    try:
        driver.set_window_size(width, height)
        for index, scene in enumerate(SCENES):
            label = f"{name}/{scene}"
            try:
                open_scene(driver, scene)
                no_horizontal_overflow(driver, label)
                if scene != "intro" and active_nav_label(driver) != scene:
                    raise AssertionError(f"active nav state does not match direct #{scene} route")

                if scene == "intro":
                    check_intro(driver, width)
                elif scene == "story":
                    check_story(driver, width)
                elif scene == "projects":
                    check_projects(driver)
                elif scene == "contact":
                    check_contact(driver)

                collision = assistant_overlaps_interactive(driver)
                if collision:
                    raise AssertionError(f"assistant launcher overlaps an interactive control: {collision}")

                if scene == "intro" and name in ("phone", "laptop"):
                    check_assistant(driver)

                driver.save_screenshot(str(OUT / f"{name}-{index:02d}-{scene}.png"))
                print(f"PASS {label}")
            except Exception as exc:
                driver.save_screenshot(str(OUT / f"{name}-{index:02d}-{scene}-failure.png"))
                failures.append(f"{label}: {type(exc).__name__}: {exc}")
        return failures
    finally:
        driver.quit()


failures = []
for width, height, name in VIEWPORTS:
    failures.extend(run_viewport(width, height, name))

if failures:
    raise SystemExit("Responsive visual QA failed:\n" + "\n".join(failures))

print("Responsive visual QA passed for Intro, Story, Projects, Contact, and the assistant on phone, tablet, laptop, and large monitor.")
