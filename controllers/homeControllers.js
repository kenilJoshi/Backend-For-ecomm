

console.log('here');
exports.home = async (req, res) => {
    res.status(200).json({
        success: true,
        greetings:"Hello from api"
    })
}