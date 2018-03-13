<?php
$current = intval(file_get_contents('gamecounter.txt'));
file_put_contents('gamecounter.txt', (string)($current + 1));
