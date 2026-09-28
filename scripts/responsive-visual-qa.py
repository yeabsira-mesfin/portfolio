import os
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = os.environ.get("PORTFOLIO_QA_URL", "http://127.0.0.1:4173")
OUT = Path(os.environ.get("PORTFOLIO_QA_OUT", "qa-screenshots"))
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    (390, 844, "phone"),
    (768, 1024, "tablet"),
    (1366, 768, "laptop"),
    (1920, 1080, "monitor"),
]


def overlap(a, b):
    return not (
        a["right"] <= b["left"]
        or a["left"] >= b["right"]
        or a["bottom"] <= b["top"]
        or a["top"] >= b["bottom"]
    )


def rect(driver, selector):
    return driver.execute_script(
        """
        const el = document.querySelector(arguments[0]);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {left:r.left, top:r.top, right:r.right, bottom:r.bottom, width:r.width, height:r.height};
        """,
        selector,
    )


def click_nav(driver, label):
    result = driver.execute_script(
        """
        const wanted = arguments[0].toLowerCase();
        const button = [...document.querySelectorAll('header nav button')]
          .find(el => el.textContent.trim().toLowerCase() === wanted);
        if (!button) return false;
        button.click();
        return true;
        """,
        label,
    )
    if not result:
        raise AssertionError(f"navigation button not found: {label}")
    # Scene transitions intentionally take 1.25s so allow the animation to settle.
    time.sleep(1.7)


def no_horizontal_overflow(driver, label):
    values = driver.execute_script(
        "return {w: document.documentElement.scrollWidth, vw: window.innerWidth};"
    )
    if values["w"] > values["vw"] + 3:
        raise AssertionError(
            f"{label}: horizontal overflow detected ({values['w']} > {values['vw']})"
        )


def contact_card_rect(driver, label_text):
    return driver.execute_script(
        """
        const target = [...document.querySelectorAll('[data-contact-content] *')]
          .find(el => el.textContent && el.textContent.trim() === arguments[0]);
        if (!target) return null;
        const card = target.closest('a, div[class*="rounded-2xl"]');
        if (!card) return null;
        const r = card.getBoundingClientRect();
        return {left:r.left, top:r.top, right:r.right, bottom:r.bottom, width:r.width, height:r.height};
        """,
        label_text,
    )


def hint_rect(driver):
    return driver.execute_script(
        """
        const p = [...document.querySelectorAll('p')]
          .find(el => el.textContent && el.textContent.includes('Curious? Ask me anything.'));
        if (!p) return null;
        const bubble = p.parentElement;
        const r = bubble.getBoundingClientRect();
        return {left:r.left, top:r.top, right:r.right, bottom:r.bottom, width:r.width, height:r.height};
        """
    )


def scene_state(driver):
    return driver.execute_script(
        """
        const active = [...document.querySelectorAll('header nav button')]
          .find(el => String(el.className).includes('bg-[#7CEBDD]/10'));
        return {
          active: active ? active.textContent.trim() : null,
          projectScene: !!document.querySelector('[data-project-scene]'),
          gears: document.querySelectorAll('[data-project-gear]').length,
          controls: document.querySelectorAll('[data-project-controls]').length,
          cards: document.querySelectorAll('[data-project-card]').length,
          contact: !!document.querySelector('[data-contact-content]'),
          body: document.body.innerText.slice(0, 1200)
        };
        """
    )


def require_scene(driver, expected, name):
    state = scene_state(driver)
    if (state["active"] is None or state["active"].lower() != expected.lower()):
        driver.save_screenshot(str(OUT / f"{name}-scene-error-{expected}.png"))
        raise AssertionError(f"{name}: expected active scene {expected}, state={state}")
    return state


def run_viewport(width, height, name):
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f"--window-size={width},{height}")
    options.add_argument("--force-device-scale-factor=1")

    driver = webdriver.Chrome(options=options)
    try:
        driver.set_window_size(width, height)
        driver.get(BASE_URL)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "header")))
        time.sleep(0.5)

        no_horizontal_overflow(driver, f"{name}/intro")
        driver.save_screenshot(str(OUT / f"{name}-00-intro.png"))

        click_nav(driver, "story")
        require_scene(driver, "Story", name)
        no_horizontal_overflow(driver, f"{name}/story")
        driver.save_screenshot(str(OUT / f"{name}-01-story.png"))

        click_nav(driver, "projects")
        state = require_scene(driver, "Projects", name)
        no_horizontal_overflow(driver, f"{name}/projects")
        if not state["projectScene"] or state["gears"] != 1 or state["controls"] != 1 or state["cards"] < 1:
            driver.save_screenshot(str(OUT / f"{name}-02-projects-debug.png"))
            raise AssertionError(f"{name}/projects: invalid structure: {state}")

        gear = rect(driver, '[data-project-gear]')
        if not gear or gear["bottom"] <= 80 or gear["top"] >= height:
            raise AssertionError(f"{name}/projects: roller is not visible in first viewport: {gear}")

        windows_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//button[.//*[contains(text(),'Windows Infrastructure')]]"))
        )
        driver.execute_script("arguments[0].click();", windows_button)
        time.sleep(1.1)
        card = rect(driver, '[data-project-card]')
        card_text = driver.execute_script(
            "const el=document.querySelector('[data-project-card]'); return el ? el.innerText : '';"
        )
        if "Windows Infrastructure" not in card_text:
            raise AssertionError(f"{name}/projects: selected card did not update to Windows")
        if not card or card["top"] >= height - 24 or card["bottom"] <= 90:
            raise AssertionError(f"{name}/projects: selected project is not visible after click: {card}")
        driver.save_screenshot(str(OUT / f"{name}-02-projects.png"))

        click_nav(driver, "contact")
        state = require_scene(driver, "Contact", name)
        if not state["contact"]:
            raise AssertionError(f"{name}/contact: contact marker missing: {state}")
        no_horizontal_overflow(driver, f"{name}/contact")

        assistant = rect(driver, 'button[aria-label="Open portfolio assistant"]')
        based_in = contact_card_rect(driver, "Based in")
        hint = hint_rect(driver)
        if assistant and based_in and overlap(assistant, based_in):
            driver.save_screenshot(str(OUT / f"{name}-03-contact-overlap.png"))
            raise AssertionError(f"{name}/contact: assistant overlaps Based in card: assistant={assistant}, card={based_in}")
        if hint and based_in and overlap(hint, based_in):
            driver.save_screenshot(str(OUT / f"{name}-03-contact-overlap.png"))
            raise AssertionError(f"{name}/contact: hint overlaps Based in card: hint={hint}, card={based_in}")

        driver.save_screenshot(str(OUT / f"{name}-03-contact.png"))
        print(f"PASS {name} {width}x{height}")
    finally:
        driver.quit()


failures = []
for width, height, name in VIEWPORTS:
    try:
        run_viewport(width, height, name)
    except Exception as exc:
        failures.append(f"{name} {width}x{height}: {type(exc).__name__}: {exc}")

if failures:
    raise SystemExit("Responsive visual QA failed:\n" + "\n".join(failures))

print("Responsive visual QA passed for phone, tablet, laptop, and large monitor.")
