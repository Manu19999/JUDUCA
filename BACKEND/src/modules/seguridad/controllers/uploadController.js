export const subirImagen = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }

    const imageUrl = `http://localhost:${process.env.PORT || 4000}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
};