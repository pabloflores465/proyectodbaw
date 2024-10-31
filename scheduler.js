const cron = require('node-cron');
const { exec } = require('child_process');

// Programa la tarea para que se ejecute cada minuto
cron.schedule('* * * * *', () => {
    console.log('Ejecutando disable_user.php cada minuto');

    exec('/opt/lampp/bin/php /opt/lampp/htdocs/proyectodbaw/phpsql/disable_user.php', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error de salida: ${stderr}`);
            return;
        }
        console.log(`Resultado: ${stdout}`);
    });
});
