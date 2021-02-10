    <footer>
        <a class="block" href="/impressum">Impressum</a>
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
        </script>
        <!-- Global JavaScript -->
        <?= js('assets/js/site.js') ?>
    </footer>
</body>
</html>