    <footer>
        <p>© 2021 <?= $site->author()->htmL() ?></p>

        <!-- Config variables -->
        <script type="text/javascript">
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
        <?= js('assets/js/menu.js') ?>
        <?= js('assets/js/site.js') ?>
    </footer>
</body>
</html>