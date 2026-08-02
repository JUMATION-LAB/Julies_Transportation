
// JT-20260802-4721

const generateBookingReference = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `JT-${year}${month}${day}-${randomNumber}`;
};

module.exports = {
    generateBookingReference
};