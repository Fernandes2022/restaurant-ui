import emailjs from '@emailjs/browser';

export async function sendAdminNewOrderEmail({ adminEmail, customerName }) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        return;
    }

    const templateParams = {
        to_email: adminEmail,
        customer_name: customerName || 'Customer',
        message: 'A new order has been placed. Please log in to your admin dashboard to view details.'
    };

    try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
    } catch (error) {
        console.warn('Failed to send admin new order email:', error);
    }
}


