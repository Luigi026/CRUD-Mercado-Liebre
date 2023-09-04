const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        return cb(null, './public/images/products')
    },
    filename : (req, file, cb) => {
        return cb(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }//Con este codigo guardo un archivo con numero y nombre diferente
})
//destination : donde quiero que se guarde el archivo
//filename : con que nombre quiero que se guarde el archivo
//Date.now() : me da la fecha formato numero, el numero es distinto por cada milisegundo que pasa
//extname : trae la extension de un archivo
const upload = multer({
    storage
})
module.exports = upload
//Con esto tengo la configuracion basica de MULTER, sin tener en cuenta con vaidaciones como limetes, peso etc.
//Luego a esto se implementa mandandolo a la ruta que retorna los datos del formulario, siendo esta la ruta POST donde se coloca "upload" y al ser una sola imagen uso el metodo single('image')
//luego vamos al controlador y hacemos que el metodo create devuelva (req.file)