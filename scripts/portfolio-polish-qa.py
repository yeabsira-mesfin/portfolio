import os
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = os.environ.get("PORTFOLIO_QA_URL", "http://127.0.0.1:4173")
OUT = Path(os.environ.get("PORTFOLIO_QA_OUT", "qa-screenshots"))
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    (390, 844, "phone"),
    (768, 1024, "tablet"),
    (1366, 768, "laptop"),
    (1920, 1080, "monitor"),
]


def js_rect(driver, script, *args):
    return driver.execute_script(
        f"""
        const el = (() => {{ {script} }})();
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {{left:r.left, top:r.top, right:r.right, bottom:r.bottom, width:r.width, height:r.height}};
        """,
        *args,
    )


def click_nav(driver, label):
    ok = driver.execute_script(
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
    if not ok:
        raise AssertionError(f"navigation button not found: {label}")


def wait_active(driver, label):
    def active(d):
        return d.execute_script(
            """
            const wanted = arguments[0].toLowerCase();
            const button = [...document.querySelectorAll('header nav button')]
              .find(el => String(el.className).includes('bg-[#7CEBDD]/10'));
            return button && button.textContent.trim().toLowerCase() === wanted;
            """,
            label,
        )

    WebDriverWait(driver, 8).until(active)
    time.sleep(0.35)


def generic_gear_rect(driver):
    return js_rect(
        driver,
        """
        const svg = [...document.querySelectorAll('svg')]
          .find(el => el.getAttribute('viewBox') === '0 0 600 600');
        return svg ? svg.closest('[class*="aspect-square"]') : null;
        """,
    )


def project_gear_rect(driver):
    return js_rect(driver, "return document.querySelector('[data-project-gear]');")


def journey_robot_rect(driver):
    return js_rect(
        driver,
        "return document.querySelector('button[data-journey-robot=\"true\"] > div:last-child');",
    )


def assert_same_size(a, b, label, tolerance=2.5):
    if not a or not b:
        raise AssertionError(f"{label}: missing element geometry, a={a}, b={b}")
    if abs(a["width"] - b["width"]) > tolerance or abs(a["height"] - b["height"]) > tolerance:
        raise AssertionError(f"{label}: size mismatch, a={a}, b={b}")


def assert_near_gear_size(reference, project, label):
    if not reference or not project:
        raise AssertionError(f"{label}: missing roller geometry, reference={reference}, project={project}")
    tolerance = max(18.0, reference["width"] * 0.06)
    if abs(reference["width"] - project["width"]) > tolerance:
        raise AssertionError(
            f"{label}: Projects roller is not the same visual scale as Story, story={reference}, projects={project}"
        )


def assert_bzzz_at_ten_seconds(driver):
    WebDriverWait(driver, 5).until(
        lambda d: d.execute_script("return !!document.querySelector('button[data-journey-robot=\"true\"] p');")
    )
    initial = driver.execute_script(
        "return document.querySelector('button[data-journey-robot=\"true\"] p')?.textContent || '';"
    )
    if "Bzzz" in initial:
        raise AssertionError("Bzzz message appeared immediately instead of after the idle delay")
    time.sleep(10.6)
    text = driver.execute_script(
        "return document.querySelector('button[data-journey-robot=\"true\"] p')?.textContent || '';"
    )
    if "Bzzz" not in text:
        raise AssertionError(f"Bzzz message did not appear at about 10 seconds, text={text!r}")


def project_button_labels(driver):
    return driver.execute_script(
        """
        const root = document.querySelector('[data-project-controls]');
        if (!root) return [];
        return [...root.querySelectorAll('button')].map(b => b.innerText.trim());
        """
    )


def assert_project_visuals(driver, viewport_name, viewport_width):
    labels = project_button_labels(driver)
    for required in ["AI Security Testing Lab", "SignalDesk Endpoint Posture Advisor"]:
        if not any(required in label for label in labels):
            raise AssertionError(f"{viewport_name}: missing new project {required}")

    buttons = driver.execute_script(
        """
        const root = document.querySelector('[data-project-controls]');
        return root ? [...root.querySelectorAll('button')].map((_, i) => i) : [];
        """
    )
    if len(buttons) < 7:
        raise AssertionError(f"{viewport_name}: expected at least 7 project choices, found {len(buttons)}")

    for index in buttons:
        result = driver.execute_script(
            """
            const root = document.querySelector('[data-project-controls]');
            const button = root?.querySelectorAll('button')[arguments[0]];
            if (!button) return null;
            button.click();
            return button.innerText.trim();
            """,
            index,
        )
        if not result:
            raise AssertionError(f"{viewport_name}: could not activate project index {index}")
        time.sleep(0.9)
        state = driver.execute_script(
            """
            const card = document.querySelector('[data-project-card]');
            const visual = card?.firstElementChild;
            if (!card || !visual) return null;
            const vr = visual.getBoundingClientRect();
            const cr = card.getBoundingClientRect();
            const img = visual.querySelector('img');
            const ir = img ? img.getBoundingClientRect() : null;
            const cardStyle = getComputedStyle(card);
            const imgStyle = img ? getComputedStyle(img) : null;
            return {
              title: card.querySelector('h3')?.textContent || '',
              visual: {left:vr.left, top:vr.top, right:vr.right, bottom:vr.bottom, width:vr.width, height:vr.height},
              card: {left:cr.left, top:cr.top, right:cr.right, bottom:cr.bottom, width:cr.width, height:cr.height},
              image: ir ? {left:ir.left, top:ir.top, right:ir.right, bottom:ir.bottom, width:ir.width, height:ir.height} : null,
              objectFit: imgStyle?.objectFit || null,
              overflowY: cardStyle.overflowY,
              maxHeight: cardStyle.maxHeight,
            };
            """
        )
        if not state:
            raise AssertionError(f"{viewport_name}: selected project card did not render for {result}")
        v = state["visual"]
        if v["width"] < 120 or v["height"] < 100:
            raise AssertionError(f"{viewport_name}: project visual too small for {state['title']}: {v}")
        ratio = v["width"] / max(v["height"], 1)
        if not 1.55 <= ratio <= 2.05:
            raise AssertionError(f"{viewport_name}: project visual is not a stable wide frame for {state['title']}: ratio={ratio:.3f}")
        if state["image"]:
            img = state["image"]
            if state["objectFit"] != "contain":
                raise AssertionError(f"{viewport_name}: image can crop for {state['title']}, objectFit={state['objectFit']}")
            if img["left"] < v["left"] - 2 or img["right"] > v["right"] + 2 or img["top"] < v["top"] - 2 or img["bottom"] > v["bottom"] + 2:
                raise AssertionError(f"{viewport_name}: image escapes preview frame for {state['title']}")
        if viewport_width >= 1024:
            if state["overflowY"] == "auto" or state["maxHeight"] != "none":
                raise AssertionError(
                    f"{viewport_name}: laptop/desktop project card can still clip previews for {state['title']}, overflowY={state['overflowY']}, maxHeight={state['maxHeight']}"
                )


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
        WebDriverWait(driver, 10).until(lambda d: d.execute_script("return !!document.querySelector('header');"))
        WebDriverWait(driver, 6).until(lambda d: d.execute_script("return !!document.querySelector('button[data-journey-robot=\"true\"]');"))
        time.sleep(0.4)

        intro_robot = journey_robot_rect(driver)
        if name == "phone":
            assert_bzzz_at_ten_seconds(driver)

        click_nav(driver, "story")
        wait_active(driver, "story")
        story_robot = journey_robot_rect(driver)
        story_gear = generic_gear_rect(driver)
        assert_same_size(intro_robot, story_robot, f"{name}: Intro and Story robot")

        click_nav(driver, "projects")
        wait_active(driver, "projects")
        project_robot = journey_robot_rect(driver)
        project_gear = project_gear_rect(driver)
        assert_same_size(story_robot, project_robot, f"{name}: Story and Projects robot")
        assert_near_gear_size(story_gear, project_gear, f"{name}: Projects roller scale")
        assert_project_visuals(driver, name, width)
        driver.save_screenshot(str(OUT / f"{name}-04-polish-qa.png"))

        click_nav(driver, "contact")
        wait_active(driver, "contact")
        contact_gear = generic_gear_rect(driver)
        assert_near_gear_size(contact_gear, project_gear, f"{name}: Projects and Contact roller scale")

        print(f"PASS polish QA {name} {width}x{height}")
    finally:
        driver.quit()


failures = []
for width, height, name in VIEWPORTS:
    try:
        run_viewport(width, height, name)
    except Exception as exc:
        failures.append(f"{name} {width}x{height}: {type(exc).__name__}: {exc}")

if failures:
    raise SystemExit("Portfolio polish QA failed:\n" + "\n".join(failures))

print("Portfolio polish QA passed: roller and robot sizing, 10-second Bzzz timing, uncropped project visuals, and new projects verified across phone, tablet, laptop, and monitor.")
