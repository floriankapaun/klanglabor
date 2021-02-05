    <footer>
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
        <?= js('assets/js/bg.js') ?>
    </footer>
</body>
</html>