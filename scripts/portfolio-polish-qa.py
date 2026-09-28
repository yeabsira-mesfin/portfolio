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


def click_home(driver):
    ok = driver.execute_script(
        """
        const button = document.querySelector('header button');
        if (!button) return false;
        button.click();
        return true;
        """
    )
    if not ok:
        raise AssertionError("home/YM button not found")


def wait_scene(driver, label):
    selectors = {
        "story": "[data-story-content]",
        "projects": "[data-project-gear]",
        "contact": "[data-contact-content]",
    }
    selector = selectors[label]

    def ready(d):
        return d.execute_script(
            """
            const wanted = arguments[0].toLowerCase();
            const selector = arguments[1];
            const active = [...document.querySelectorAll('header nav button')]
              .find(el => String(el.className).includes('bg-[#7CEBDD]/10'));
            const target = document.querySelector(selector);
            return !!target && target.offsetParent !== null && active && active.textContent.trim().toLowerCase() === wanted;
            """,
            label,
            selector,
        )

    WebDriverWait(driver, 10).until(ready)
    time.sleep(0.55)


def gear_rect(driver, root_selector=None):
    return driver.execute_script(
        """
        const root = arguments[0] ? document.querySelector(arguments[0]) : document;
        if (!root) return null;
        const svg = [...root.querySelectorAll('svg')]
          .find(el => el.getAttribute('viewBox') === '0 0 600 600');
        const el = svg ? svg.closest('[class*="aspect-square"]') : null;
        if (!el || el.offsetParent === null) return null;
        const r = el.getBoundingClientRect();
        return {left:r.left, top:r.top, right:r.right, bottom:r.bottom, width:r.width, height:r.height};
        """,
        root_selector,
    )


def gear_animation(driver):
    return driver.execute_script(
        """
        const svg = [...document.querySelectorAll('svg')]
          .find(el => el.getAttribute('viewBox') === '0 0 600 600' && el.offsetParent !== null);
        if (!svg) return null;
        const s = getComputedStyle(svg);
        return {name:s.animationName, duration:s.animationDuration};
        """
    )


def robot_rect(driver):
    return driver.execute_script(
        """
        const el = document.querySelector('button[data-journey-robot="true"] > div:last-child');
        if (!el || el.offsetParent === null) return null;
        const r = el.getBoundingClientRect();
        return {width:r.width, height:r.height};
        """
    )


def assert_same_robot(a, b, label):
    if not a or not b:
        raise AssertionError(f"{label}: visible robot missing, a={a}, b={b}")
    if abs(a["width"] - b["width"]) > 2.5 or abs(a["height"] - b["height"]) > 2.5:
        raise AssertionError(f"{label}: robot size mismatch, a={a}, b={b}")


def assert_same_gear(a, b, label):
    if not a or not b:
        raise AssertionError(f"{label}: visible mechanism missing, a={a}, b={b}")
    tolerance = max(18.0, a["width"] * 0.06)
    if abs(a["width"] - b["width"]) > tolerance:
        raise AssertionError(f"{label}: mechanism size mismatch, a={a}, b={b}")


def assert_bzzz_after_ten_seconds(driver):
    WebDriverWait(driver, 5).until(
        lambda d: d.execute_script("return !!document.querySelector('button[data-journey-robot=\"true\"] p');")
    )
    initial = driver.execute_script(
        "return document.querySelector('button[data-journey-robot=\"true\"] p')?.textContent || '';"
    )
    if "Bzzz" in initial:
        raise AssertionError("Bzzz appeared immediately instead of after the idle delay")
    time.sleep(10.6)
    text = driver.execute_script(
        "return document.querySelector('button[data-journey-robot=\"true\"] p')?.textContent || '';"
    )
    if "Bzzz" not in text:
        raise AssertionError(f"Bzzz did not appear at about ten seconds, text={text!r}")


def assert_story_experience(driver, viewport_name):
    WebDriverWait(driver, 6).until(
        lambda d: d.execute_script(
            """
            const el = document.querySelector('[data-story-experience="true"]');
            return !!el && el.offsetParent !== null && el.getBoundingClientRect().height > 200;
            """
        )
    )
    content = driver.execute_script(
        "return document.querySelector('[data-story-experience=\"true\"]')?.textContent || '';"
    ).lower()
    for required in ["experience / trajectory", "200+ enterprise event builds", "mmcy", "george washington university"]:
        if required not in content:
            raise AssertionError(f"{viewport_name}: Story experience missing {required!r}")

    driver.execute_script(
        "document.querySelector('[data-story-experience=\"true\"]')?.scrollIntoView({block:'start', behavior:'auto'});"
    )
    time.sleep(0.35)
    if viewport_name in {"laptop", "monitor"}:
        driver.save_screenshot(str(OUT / f"{viewport_name}-01b-story-experience.png"))


def assert_projects(driver, viewport_name, viewport_width):
    labels = driver.execute_script(
        """
        const root = document.querySelector('[data-project-controls]');
        return root ? [...root.querySelectorAll('button')].map(b => b.innerText.trim()) : [];
        """
    )
    for required in ["AI Security Testing Lab", "SignalDesk Endpoint Posture Advisor"]:
        if not any(required in label for label in labels):
            raise AssertionError(f"{viewport_name}: missing added project {required}")
    if len(labels) < 7:
        raise AssertionError(f"{viewport_name}: expected at least seven project choices, found {len(labels)}")

    for index in range(len(labels)):
        expected = driver.execute_script(
            """
            const root = document.querySelector('[data-project-controls]');
            const button = root?.querySelectorAll('button')[arguments[0]];
            if (!button) return null;
            const title = button.querySelector('p')?.textContent?.trim() || button.innerText.trim();
            button.click();
            return title;
            """,
            index,
        )
        if not expected:
            raise AssertionError(f"{viewport_name}: could not select project {index}")

        WebDriverWait(driver, 5).until(
            lambda d: d.execute_script(
                "return document.querySelector('[data-project-card] h3')?.textContent?.trim() === arguments[0];",
                expected,
            )
        )
        time.sleep(0.2)

        state = driver.execute_script(
            """
            const card = document.querySelector('[data-project-card]');
            const visual = card?.firstElementChild;
            if (!card || !visual) return null;
            const vr = visual.getBoundingClientRect();
            const img = visual.querySelector('img');
            const ir = img?.getBoundingClientRect();
            const cs = getComputedStyle(card);
            const is = img ? getComputedStyle(img) : null;
            return {
              title: card.querySelector('h3')?.textContent || '',
              visual: {left:vr.left, top:vr.top, right:vr.right, bottom:vr.bottom, width:vr.width, height:vr.height},
              image: ir ? {left:ir.left, top:ir.top, right:ir.right, bottom:ir.bottom} : null,
              objectFit: is?.objectFit || null,
              overflowY: cs.overflowY,
              maxHeight: cs.maxHeight,
            };
            """
        )
        if not state:
            raise AssertionError(f"{viewport_name}: selected project card did not render for {expected}")

        visual = state["visual"]
        ratio = visual["width"] / max(visual["height"], 1)
        if visual["width"] < 120 or visual["height"] < 100 or not 1.55 <= ratio <= 2.05:
            raise AssertionError(f"{viewport_name}: unstable project preview for {state['title']}: {visual}")

        if state["image"]:
            img = state["image"]
            if state["objectFit"] != "contain":
                raise AssertionError(f"{viewport_name}: image can crop for {state['title']}")
            if img["left"] < visual["left"] - 2 or img["right"] > visual["right"] + 2 or img["top"] < visual["top"] - 2 or img["bottom"] > visual["bottom"] + 2:
                raise AssertionError(f"{viewport_name}: image escapes preview frame for {state['title']}")

        if viewport_width >= 1024 and (state["overflowY"] == "auto" or state["maxHeight"] != "none"):
            raise AssertionError(
                f"{viewport_name}: project card can still clip on laptop/desktop for {state['title']}"
            )


def assert_home_return(driver, viewport_name, viewport_width):
    click_home(driver)
    time.sleep(1.4)
    driver.save_screenshot(str(OUT / f"{viewport_name}-05-home-return.png"))
    state = driver.execute_script(
        """
        const h1 = document.querySelector('h1');
        const robot = document.querySelector('button[data-journey-robot="true"]');
        const active = [...document.querySelectorAll('header nav button')]
          .find(el => String(el.className).includes('bg-[#7CEBDD]/10'));
        const r = robot && robot.offsetParent !== null ? robot.getBoundingClientRect() : null;
        return {
          heading: h1?.textContent || '',
          robotVisible: !!r,
          robotAria: robot?.getAttribute('aria-label') || '',
          robotRect: r ? {left:r.left, right:r.right, width:r.width, height:r.height} : null,
          activeNav: active?.textContent?.trim() || '',
        };
        """
    )

    if "Yeabsira" not in state["heading"]:
        raise AssertionError(f"{viewport_name}: Home did not render after YM click: {state}")
    if not state["robotVisible"]:
        raise AssertionError(f"{viewport_name}: Home journey robot missing after return: {state}")
    if not state["robotAria"].startswith("Explore more"):
        raise AssertionError(f"{viewport_name}: journey robot kept the wrong scene after Home return: {state}")
    if state["robotRect"]["left"] < viewport_width * 0.5:
        raise AssertionError(f"{viewport_name}: Home robot stayed on the left after return: {state}")


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

        intro_robot = robot_rect(driver)
        if name == "phone":
            assert_bzzz_after_ten_seconds(driver)

        click_nav(driver, "story")
        wait_scene(driver, "story")
        story_robot = robot_rect(driver)
        story_gear = gear_rect(driver)
        assert_same_robot(intro_robot, story_robot, f"{name}: Intro/Story")
        assert_story_experience(driver, name)
        animation = gear_animation(driver)
        if not animation or "ym-ambient-gear-turn" not in animation["name"]:
            raise AssertionError(f"{name}: slow ambient gear animation missing: {animation}")

        click_nav(driver, "projects")
        wait_scene(driver, "projects")
        project_robot = robot_rect(driver)
        project_gear = gear_rect(driver, "[data-project-gear]")
        assert_same_robot(story_robot, project_robot, f"{name}: Story/Projects")
        assert_same_gear(story_gear, project_gear, f"{name}: Story/Projects")
        assert_projects(driver, name, width)
        driver.save_screenshot(str(OUT / f"{name}-04-polish-qa.png"))

        assert_home_return(driver, name, width)
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

print("Portfolio polish QA passed: Home robot return position, animated Story experience, slow ambient roller, gentle scene turn, roller and robot consistency, ten-second Bzzz timing, uncropped project previews, and featured GitHub projects verified across phone, tablet, laptop, and monitor.")
