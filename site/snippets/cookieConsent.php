<?php
$isVisible = true;
$statisticsAllowed = true;

if (isset($_COOKIE['NECESSARY_COOKIES_ALLOWED']) && isset($_COOKIE['STATISTICAL_COOKIES_ALLOWED'])) {
    $isVisible = false;
    $statisticsAllowed = $_COOKIE['STATISTICAL_COOKIES_ALLOWED'] === 'true';
}
?>
<article id="cookieConsent" class="<?php e($isVisible, 'visible') ?>">
    <section class="block block-xl caps">
        <h2 class="color-paper bg-highlight">Cookie Einstellungen</h2>
    </section>

    <section>
        <div class="block">
            <input id="cookie-category_necessary" class="cookie-category_checkbox" type="checkbox" checked disabled>
            <label class="disabled" for="cookie-category_necessary" tabindex="-1">Notwendig</label>
        </div><!--
     --><div class="block">
            <input id="cookie-category_statistics" class="cookie-category_checkbox" type="checkbox" <?= e($statisticsAllowed, 'checked') ?>>
            <label for="cookie-category_statistics" tabindex="0">Statistik</label>
        </div>
    </section>

    <p id="cookieDisclaimer" class="block">
        Diese Website verwendet Cookies. Neben technisch notwendigen werden auch Cookies gesetzt, die statistische Auswertungen oder eine Personalisierung Ihres Nutzererlebnisses ermöglichen. Sie können Ihre Einwilligung jederzeit einsehen, ändern und widerrufen. Mehr dazu erfahren Sie <a href="https://www.hs-augsburg.de/Service/Datenschutz.html" target="_blank" rel="noreferrer">hier</a>.
    </p>

    <button aria-label="Close Cookie Consent" id="cookieConsentClose" class="block block-xl caps">
        Speichern
    </button>
</article>