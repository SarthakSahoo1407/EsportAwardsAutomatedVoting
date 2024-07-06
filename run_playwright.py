import sys
from playwright.sync_api import sync_playwright

def run(playwright, name, email) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://esportsawards.com/vote/")
    page.get_by_role("link", name="Accept & continue").click()
    page.get_by_role("img", name="Mortal").click()
    page.get_by_role("img", name="S8UL Esports").click()
    page.get_by_role("button", name="submit votes").click()
    page.get_by_placeholder("Please enter your full name...").click()
    page.get_by_placeholder("Please enter your full name...").fill(name)
    page.get_by_placeholder("Please enter your full name...").press("Tab")
    page.get_by_placeholder("Email").fill(email)
    page.get_by_text("NO").nth(2).click()
    page.get_by_text("NO").nth(3).click()
    page.get_by_role("button", name="submit").click()
    page.get_by_label("Male", exact=True).check()
    page.get_by_label("-29").check()
    page.get_by_role("button", name="submit").click()

    context.close()
    browser.close()

if __name__ == "__main__":
    name = sys.argv[1]
    email = sys.argv[2]
    with sync_playwright() as playwright:
        run(playwright, name, email)
