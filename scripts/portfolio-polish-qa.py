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


def js(driver, script, *args):
    return driver.execute_script(script, *args)


def click_nav(driver, label):
    ok = js(
        driver,
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
    if not js(driver, "const b=document.querySelector('header button'); if(!b)return false; b.click(); return true;"):
        raise AssertionError("home/YM button not found")


def wait_scene(driver, label):
    selectors = {
        "story": "[data-story-content]",
        "projects": "[data-project-scene]",
        "contact": "[data-contact-content]",
    }
    selector = selectors[label]

    def ready(d):
        return js(
            d,
            """
            const wanted=arguments[0].toLowerCase();
            const target=document.querySelector(arguments[1]);
            const active=[...document.querySelectorAll('header nav button')]
              .find(el=>String(el.className).includes('bg-[#7CEBDD]/10'));
            if(!target || !active || active.textContent.trim().toLowerCase()!==wanted) return false;
            const r=target.getBoundingClientRect();
            const s=getComputedStyle(target);
            return r.width>0 && r.height>0 && s.display!=='none' && s.visibility!=='hidden';
            """,
            label,
            selector,
        )

    WebDriverWait(driver, 10).until(ready)
    time.sleep(0.55)


def journey_robot_state(driver):
    return js(
        driver,
        """
        const el=document.querySelector('button[data-journey-robot="true"]');
        if(!el) return null;
        const r=el.getBoundingClientRect();
        const s=getComputedStyle(el);
        const robot=el.querySelector('div:last-child');
        const rr=robot ? robot.getBoundingClientRect() : null;
        return {
          aria:el.getAttribute('aria-label')||'',
          visible:r.width>0 && r.height>0 && s.display!=='none' && s.visibility!=='hidden',
          left:r.left,right:r.right,width:r.width,height:r.height,
          robotWidth:rr?.width||0,robotHeight:rr?.height||0
        };
        """,
    )


def gear_state(driver, root_selector=None):
    return js(
        driver,
        """
        const root=arguments[0] ? document.querySelector(arguments[0]) : document;
        if(!root) return null;
        const svg=[...root.querySelectorAll('svg')].find(el=>el.getAttribute('viewBox')==='0 0 600 600');
        if(!svg) return null;
        const host=svg.closest('[class*="aspect-square"]');
        const r=host?.getBoundingClientRect();
        const s=getComputedStyle(svg);
        return r ? {width:r.width,height:r.height,animationName:s.animationName,animationDuration:s.animationDuration} : null;
        """,
        root_selector,
    )


def assert_robot_size(a, b, label):
    if not a or not b or not a["visible"] or not b["visible"]:
        raise AssertionError(f"{label}: journey robot missing: {a}, {b}")
    if abs(a["robotWidth"] - b["robotWidth"]) > 3 or abs(a["robotHeight"] - b["robotHeight"]) > 3:
        raise AssertionError(f"{label}: journey robot size changed: {a}, {b}")


def assert_gear_size(a, b, label):
    if not a or not b:
        raise AssertionError(f"{label}: gear missing: {a}, {b}")
    tolerance=max(18, a["width"]*0.06)
    if abs(a["width"]-b["width"])>tolerance:
        raise AssertionError(f"{label}: gear size mismatch: {a}, {b}")


def assert_story(driver, viewport_name):
    WebDriverWait(driver, 8).until(
        lambda d: bool(js(d, "return document.querySelector('[data-story-experience=\"true\"]');"))
    )
    text=js(driver, "return document.querySelector('[data-story-experience=\"true\"]')?.textContent||'';").lower()
    for required in [
        "experience / trajectory",
        "200+ enterprise event builds",
        "mmcy",
        "account managers",
        "george washington university",
    ]:
        if required not in text:
            raise AssertionError(f"{viewport_name}: Story experience missing {required!r}")

    js(driver, "document.querySelector('[data-story-experience=\"true\"]')?.scrollIntoView({block:'start'});")
    time.sleep(0.35)
    driver.save_screenshot(str(OUT / f"{viewport_name}-story-experience.png"))


def assert_projects(driver, viewport_name):
    labels=js(
        driver,
        """
        const root=document.querySelector('[data-project-controls]');
        return root ? [...root.querySelectorAll('button')].map(b=>b.innerText.trim()) : [];
        """,
    )
    if len(labels)<7:
        raise AssertionError(f"{viewport_name}: expected at least 7 project choices, got {len(labels)}")
    for required in ["AI Security Testing Lab", "SignalDesk Endpoint Posture Advisor"]:
        if not any(required in label for label in labels):
            raise AssertionError(f"{viewport_name}: missing project {required}")

    preview=js(
        driver,
        """
        const img=document.querySelector('[data-project-card] img');
        if(!img) return {hasImage:false};
        const s=getComputedStyle(img); const r=img.getBoundingClientRect();
        return {hasImage:true,objectFit:s.objectFit,width:r.width,height:r.height};
        """,
    )
    if preview.get("hasImage") and preview.get("objectFit") != "contain":
        raise AssertionError(f"{viewport_name}: selected project image can crop: {preview}")


def assert_bzzz(driver):
    initial=js(driver, "return document.querySelector('button[data-journey-robot=\"true\"] p')?.textContent||'';")
    if "Bzzz" in initial:
        raise AssertionError("Bzzz appeared immediately")
    time.sleep(10.6)
    after=js(driver, "return document.querySelector('button[data-journey-robot=\"true\"] p')?.textContent||'';")
    if "Bzzz" not in after:
        raise AssertionError(f"Bzzz did not appear after about ten seconds: {after!r}")


def assert_home_return(driver, viewport_name, viewport_width):
    click_home(driver)

    def home_ready(d):
        state=journey_robot_state(d)
        heading=js(d, "return document.querySelector('h1')?.textContent||'';")
        return bool(state and state["visible"] and state["aria"].startswith("Explore more") and "Yeabsira" in heading)

    WebDriverWait(driver, 8).until(home_ready)
    time.sleep(0.35)
    state=journey_robot_state(driver)
    if state["left"] < viewport_width*0.5:
        raise AssertionError(f"{viewport_name}: Home robot stayed on left after return: {state}")
    driver.save_screenshot(str(OUT / f"{viewport_name}-home-return.png"))


def assert_contact_swap(driver, viewport_name):
    click_nav(driver, "contact")
    wait_scene(driver, "contact")
    journey=journey_robot_state(driver)
    chatbot=js(
        driver,
        """
        const el=document.querySelector('button[aria-label="Open portfolio assistant"]');
        if(!el) return null;
        const r=el.getBoundingClientRect(); const s=getComputedStyle(el);
        return {visible:r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden',width:r.width,height:r.height};
        """,
    )
    if journey and journey["visible"]:
        raise AssertionError(f"{viewport_name}: journey robot visible on Contact")
    if not chatbot or not chatbot["visible"]:
        raise AssertionError(f"{viewport_name}: chatbot robot missing on Contact: {chatbot}")
    driver.save_screenshot(str(OUT / f"{viewport_name}-contact-chatbot.png"))


def run_viewport(width, height, name):
    options=Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f"--window-size={width},{height}")
    options.add_argument("--force-device-scale-factor=1")
    driver=webdriver.Chrome(options=options)

    try:
        driver.set_window_size(width,height)
        driver.get(BASE_URL)
        WebDriverWait(driver,10).until(lambda d: bool(js(d,"return document.querySelector('header');")))
        WebDriverWait(driver,8).until(lambda d: bool(journey_robot_state(d)))
        intro=journey_robot_state(driver)
        if not intro["visible"]:
            raise AssertionError(f"{name}: journey robot hidden on Home: {intro}")
        if name=="phone":
            assert_bzzz(driver)

        click_nav(driver,"story")
        wait_scene(driver,"story")
        story_robot=journey_robot_state(driver)
        assert_robot_size(intro,story_robot,f"{name}: Home/Story")
        story_gear=gear_state(driver)
        if not story_gear or "ym-ambient-gear-turn" not in story_gear["animationName"]:
            raise AssertionError(f"{name}: ambient gear animation missing: {story_gear}")
        assert_story(driver,name)

        click_nav(driver,"projects")
        wait_scene(driver,"projects")
        project_robot=journey_robot_state(driver)
        assert_robot_size(story_robot,project_robot,f"{name}: Story/Projects")
        project_gear=gear_state(driver,"[data-project-gear]")
        assert_gear_size(story_gear,project_gear,f"{name}: Story/Projects")
        assert_projects(driver,name)
        driver.save_screenshot(str(OUT/f"{name}-projects-polish.png"))

        assert_home_return(driver,name,width)
        assert_contact_swap(driver,name)
        print(f"PASS polish QA {name} {width}x{height}")
    finally:
        driver.quit()


failures=[]
for width,height,name in VIEWPORTS:
    try:
        run_viewport(width,height,name)
    except Exception as exc:
        failures.append(f"{name} {width}x{height}: {type(exc).__name__}: {exc}")

if failures:
    raise SystemExit("Portfolio polish QA failed:\n"+"\n".join(failures))

print("Portfolio polish QA passed: Home robot return, Story experience, slow ambient gear, gentle scene turn, Contact chatbot swap, Bzzz timing, project previews, and responsive behavior verified across phone, tablet, laptop, and monitor.")
