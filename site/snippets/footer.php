    <footer>
        <a class="block" href="/impressum">Impressum</a>
        <button aria-expanded="false" aria-label="Open Cookie Consent" id="cookieConsentOpen" class="block" type="button">
            Cookie Einstellungen
        </button>
        <a class="block" href="https://www.hs-augsburg.de/Service/Datenschutz.html" target="_blank" rel="noreferrer">Datenschutz</a>
        <!-- Config variables -->
        <script type="text/javascript">
            const CSRF = "<?= csrf() ?>";
            const URL = "<?= $site->url() ?>";
            const API_SLUG = "<?= option('env')['API_SLUG'] ?>";
            const API_USER = "<?= option('env')['API_USER'] ?>";
            const API_PASSWORD = "<?= option('env')['API_PASSWORD'] ?>";
            const CONFIG = {
                numberOfLines: <?= $numberOfLines ?>,
                numberOfPoints: <?= $numberOfPoints ?>,
                numberOfSegments: <?= $numberOfSegments ?>,
                sineWidth: <?= $sineWidth ?>,
                sineHeight: <?= $sineHeight ?>,
                tension: <?= $tension ?>,
                distortionInterval: <?= $distortionInterval ?>,
                lineWidth: <?= $lineWidth ?>,
            };
            const COOKIE_STORE = <?= $cookieStore ?>;
        </script>
        <!-- Load global JavaScript inline because it is super tiny -->
        <script type="text/javascript" async defer><?= require 'assets/js/site.js' ?></script>
    </footer>
</body>
</html>