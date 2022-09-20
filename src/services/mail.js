const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendLoginErrorMail(to, link, browser, city, country) {
    try {
      await this.transporter.sendMail({
        to,
        subject: 'Спорт и точка. Кто-то пытался войти в Ваш аккаунт',
        text: `Был совершена попытка входа из ${city}, ${country} с помощью ${browser} браузера. Пожалуйста сбросьте пароль ${link}`
      })
    } catch (error) {
      console.error(error);
    }
  }

  async sendResetPasswordMail(to, link, token) {
    try {
      await this.transporter.sendMail({
        to,
        subject: 'Спорт и точка. Сброс пароля аккаунта',
        text: `Для сброса пароля Вашаго аккаунта перейдите по данной ссылке: ${link + token}`
      })
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new MailService();