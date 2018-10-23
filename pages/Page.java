import java.util.List;
import java.util.Map;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class Page {
    private Map<String, String> data;
    private WebDriver driver;
    private int timeout = 15;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(2) a")
    @CacheLookup
    private WebElement aboutUs1;

    @FindBy(css = ".container-fluid footer.section div.container div.row div:nth-of-type(4) div.site-cms ul li:nth-of-type(1) a")
    @CacheLookup
    private WebElement aboutUs2;

    @FindBy(css = ".container-fluid section.coppy-section div.container div.row.coppy-right-block div:nth-of-type(1) a:nth-of-type(3)")
    @CacheLookup
    private WebElement aboutUs3;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(7) a")
    @CacheLookup
    private WebElement blog;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) ul.sub-menu li:nth-of-type(2) ul.sub-menulv2 li:nth-of-type(3) a")
    @CacheLookup
    private WebElement cleaning;

    @FindBy(css = ".container-fluid section.coppy-section div.container div.row.coppy-right-block div:nth-of-type(1) a:nth-of-type(2)")
    @CacheLookup
    private WebElement contact;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(6) a")
    @CacheLookup
    private WebElement contactUs;

    @FindBy(css = ".container-fluid footer.section div.container div.row div:nth-of-type(1) div:nth-of-type(2) p:nth-of-type(5) a")
    @CacheLookup
    private WebElement enquiriesmoveralertsCoUk;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(4) a")
    @CacheLookup
    private WebElement faqs;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) ul.sub-menu li:nth-of-type(3) a")
    @CacheLookup
    private WebElement fulfilment;

    @FindBy(css = "#purchaseAlerts div:nth-of-type(7) a.btn.btn-default")
    @CacheLookup
    private WebElement generateMoveralerts;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(1) a")
    @CacheLookup
    private WebElement home;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(4) ul.sub-menu li:nth-of-type(2) a")
    @CacheLookup
    private WebElement howtoguides;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) ul.sub-menu li:nth-of-type(2) a")
    @CacheLookup
    private WebElement industries;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(5) a")
    @CacheLookup
    private WebElement loginRegister;

    private final String pageLoadedText = "With our product MoverAlerts, you can&nbsp;target properties within certain postcodes&nbsp;which have either gone on to the market ‘For Sale’ or have just progressed to an ‘Under Offer’ stage";

    private final String pageUrl = "/";

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(4) ul.sub-menu li:nth-of-type(1) a")
    @CacheLookup
    private WebElement privacyPolicy1;

    @FindBy(css = ".container-fluid footer.section div.container div.row div:nth-of-type(4) div.site-cms ul li:nth-of-type(2) a")
    @CacheLookup
    private WebElement privacyPolicy2;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) a")
    @CacheLookup
    private WebElement productsAndServices;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) ul.sub-menu li:nth-of-type(2) ul.sub-menulv2 li:nth-of-type(2) a")
    @CacheLookup
    private WebElement removals;

    @FindBy(id = "btn-subscribe")
    @CacheLookup
    private WebElement sendRequest;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) ul.sub-menu li:nth-of-type(2) ul.sub-menulv2 li:nth-of-type(1) a")
    @CacheLookup
    private WebElement storage;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) ul.sub-menu li:nth-of-type(1) a")
    @CacheLookup
    private WebElement subscriptions;

    @FindBy(css = ".container-fluid section.coppy-section div.container div.row.coppy-right-block div:nth-of-type(1) a:nth-of-type(1)")
    @CacheLookup
    private WebElement termsConditions;

    @FindBy(css = "#navbar-ex-collapse ul.nav.navbar-nav li:nth-of-type(3) ul.sub-menu li:nth-of-type(4) a")
    @CacheLookup
    private WebElement testimonials;

    @FindBy(css = ".container-fluid div:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1) button.navbar-toggle")
    @CacheLookup
    private WebElement toggleNavigation;

    @FindBy(css = ".container-fluid footer.section div.container div.row div:nth-of-type(5) div.logo-and-intro p:nth-of-type(2) a")
    @CacheLookup
    private WebElement wwwTwentyciCoUk;

    public Page() {
    }

    public Page(WebDriver driver) {
        this();
        this.driver = driver;
    }

    public Page(WebDriver driver, Map<String, String> data) {
        this(driver);
        this.data = data;
    }

    public Page(WebDriver driver, Map<String, String> data, int timeout) {
        this(driver, data);
        this.timeout = timeout;
    }

    /**
     * Click on About Us Link.
     *
     * @return the Page class instance.
     */
    public Page clickAboutUs1Link() {
        aboutUs1.click();
        return this;
    }

    /**
     * Click on About Us Link.
     *
     * @return the Page class instance.
     */
    public Page clickAboutUs2Link() {
        aboutUs2.click();
        return this;
    }

    /**
     * Click on About Us Link.
     *
     * @return the Page class instance.
     */
    public Page clickAboutUs3Link() {
        aboutUs3.click();
        return this;
    }

    /**
     * Click on Blog Link.
     *
     * @return the Page class instance.
     */
    public Page clickBlogLink() {
        blog.click();
        return this;
    }

    /**
     * Click on Cleaning Link.
     *
     * @return the Page class instance.
     */
    public Page clickCleaningLink() {
        cleaning.click();
        return this;
    }

    /**
     * Click on Contact Link.
     *
     * @return the Page class instance.
     */
    public Page clickContactLink() {
        contact.click();
        return this;
    }

    /**
     * Click on Contact Us Link.
     *
     * @return the Page class instance.
     */
    public Page clickContactUsLink() {
        contactUs.click();
        return this;
    }

    /**
     * Click on Enquiriesmoveralerts.co.uk Link.
     *
     * @return the Page class instance.
     */
    public Page clickEnquiriesmoveralertsCoUkLink() {
        enquiriesmoveralertsCoUk.click();
        return this;
    }

    /**
     * Click on Faqs Link.
     *
     * @return the Page class instance.
     */
    public Page clickFaqsLink() {
        faqs.click();
        return this;
    }

    /**
     * Click on Fulfilment Link.
     *
     * @return the Page class instance.
     */
    public Page clickFulfilmentLink() {
        fulfilment.click();
        return this;
    }

    /**
     * Click on Generate Moveralerts Link.
     *
     * @return the Page class instance.
     */
    public Page clickGenerateMoveralertsLink() {
        generateMoveralerts.click();
        return this;
    }

    /**
     * Click on Home Link.
     *
     * @return the Page class instance.
     */
    public Page clickHomeLink() {
        home.click();
        return this;
    }

    /**
     * Click on Howtoguides Link.
     *
     * @return the Page class instance.
     */
    public Page clickHowtoguidesLink() {
        howtoguides.click();
        return this;
    }

    /**
     * Click on Industries Link.
     *
     * @return the Page class instance.
     */
    public Page clickIndustriesLink() {
        industries.click();
        return this;
    }

    /**
     * Click on Login Register Link.
     *
     * @return the Page class instance.
     */
    public Page clickLoginRegisterLink() {
        loginRegister.click();
        return this;
    }

    /**
     * Click on Privacy Policy Link.
     *
     * @return the Page class instance.
     */
    public Page clickPrivacyPolicy1Link() {
        privacyPolicy1.click();
        return this;
    }

    /**
     * Click on Privacy Policy Link.
     *
     * @return the Page class instance.
     */
    public Page clickPrivacyPolicy2Link() {
        privacyPolicy2.click();
        return this;
    }

    /**
     * Click on Products And Services Link.
     *
     * @return the Page class instance.
     */
    public Page clickProductsAndServicesLink() {
        productsAndServices.click();
        return this;
    }

    /**
     * Click on Removals Link.
     *
     * @return the Page class instance.
     */
    public Page clickRemovalsLink() {
        removals.click();
        return this;
    }

    /**
     * Click on Send Request Link.
     *
     * @return the Page class instance.
     */
    public Page clickSendRequestLink() {
        sendRequest.click();
        return this;
    }

    /**
     * Click on Storage Link.
     *
     * @return the Page class instance.
     */
    public Page clickStorageLink() {
        storage.click();
        return this;
    }

    /**
     * Click on Subscriptions Link.
     *
     * @return the Page class instance.
     */
    public Page clickSubscriptionsLink() {
        subscriptions.click();
        return this;
    }

    /**
     * Click on Terms Conditions Link.
     *
     * @return the Page class instance.
     */
    public Page clickTermsConditionsLink() {
        termsConditions.click();
        return this;
    }

    /**
     * Click on Testimonials Link.
     *
     * @return the Page class instance.
     */
    public Page clickTestimonialsLink() {
        testimonials.click();
        return this;
    }

    /**
     * Click on Toggle Navigation Button.
     *
     * @return the Page class instance.
     */
    public Page clickToggleNavigationButton() {
        toggleNavigation.click();
        return this;
    }

    /**
     * Click on Www.twentyci.co.uk Link.
     *
     * @return the Page class instance.
     */
    public Page clickWwwTwentyciCoUkLink() {
        wwwTwentyciCoUk.click();
        return this;
    }

    /**
     * Verify that the page loaded completely.
     *
     * @return the Page class instance.
     */
    public Page verifyPageLoaded() {
        (new WebDriverWait(driver, timeout)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getPageSource().contains(pageLoadedText);
            }
        });
        return this;
    }

    /**
     * Verify that current page URL matches the expected URL.
     *
     * @return the Page class instance.
     */
    public Page verifyPageUrl() {
        (new WebDriverWait(driver, timeout)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getCurrentUrl().contains(pageUrl);
            }
        });
        return this;
    }
}
