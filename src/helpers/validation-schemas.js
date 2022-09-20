const yup = require('yup');

const passwordRegEx = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;
const phoneNumberRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const isNotEmptyString = /^(?!\s*$).+/;

const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .required('Это поле обязательно для заполнения'),
  lastName: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .required('Это поле обязательно для заполнения'),
  email: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .email('Некорректно указана электронная почта')
    .required('Эл.почта обязательна'),
  password: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .matches(passwordRegEx, 'Пароль должен быть не менее 6 символов, включая одну цифру') 
    .max(30)
    .required(),
  address: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .required('Это поле обязательно для заполнения'),
  phoneNumber: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .matches(phoneNumberRegEx, 'Укажите коректный телефонный номер')
    .required('Это поле обязательно для заполнения')
});

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .email('Некорректно указана электронная почта')
    .required('Эл.почта обязательна')
});

const passwordSchema = yup.object().shape({
  userId: yup
    .string()
    .required(),
  password: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .matches(passwordRegEx, 'Пароль должен быть не менее 6 символов, включая одну цифру') 
    .max(30)
    .required()
});

const categorySchema = yup.object().shape({
  title: yup
    .string()
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .required()
});

const productSchema = yup.object().shape({
  title: yup
    .string('Название должно быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Название не должно содержать пробелы')
    .required('Название обязателено для заполнения'),
  images: yup
    .array('Картинки должены быть в виде массива строка')
    .min(1)
    .of(yup.string('Массив должен содержать строчные ссылки на картинки')),
  price: yup
    .number('Цена должны быть числом')
    .required('Цена обязателено для заполнения'),
  description: yup
    .string('Описание должно быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Это поле не должно содержать пробелы')
    .required('Описание обязателено для заполнения'),
  features: yup
    .array('Характеристик должены состоять из массива объектов')
    .of(yup.object().shape({
      name: yup.string(),
      description: yup.string()
    })),
  category: yup
    .string('Категория дожна состоять из строчного id категории из БД')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .required('Категория обязателена для заполнения')
});

const editProductSchema = yup.object().shape({
  title: yup
    .string('Название должно быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой'),
  images: yup
    .array('Картинки должены быть в виде массива строка')
    .min(1)
    .of(yup.string('Массив должен содержать строчные ссылки на картинки')),
  price: yup
    .number('Цена должны быть числом'),
  description: yup
    .string('Описание должно быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Это поле не должно содержать пробелы'),
  features: yup
    .array('Характеристик должены состоять из массива объектов')
    .of(yup.object().shape({
      name: yup.string(),
      description: yup.string()
    })),
  category: yup
    .string('Категория дожна состоять из строчного id категории из БД')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
});

const toggleDeleteSchema = yup.object().shape({
  id: yup
    .string('id должно быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой'),
  isDelete: yup
    .boolean('isDelete должно быть типа Boolean')
});

const pickupPointSchema = yup.object().shape({
  title: yup
    .string('Название должно быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Название не должно содержать пробелы')
    .required(),
  address: yup
    .string('Адрес должены быть в виде строки')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Адрес не должен содержать пробелы')
    .required(),
  coordinates: yup
    .string('Координаты должны быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Координаты не должны содержать пробелы')
    .required(),
  openHours: yup
    .string('Часы работы должены состоять из массива объектов')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Часы работы не должны содержать пробелы')
    .required()
});

const editPickupPointSchema = yup.object().shape({
  title: yup
    .string('Название должно быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Название не должно содержать пробелы'),
  address: yup
    .string('Адрес должены быть в виде строки')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Адрес не должен содержать пробелы'),
  coordinates: yup
    .string('Координаты должны быть строкой')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Координаты не должны содержать пробелы'),
  openHours: yup
    .string('Часы работы должены состоять из массива объектов')
    .matches(isNotEmptyString, 'Строка не должна быть пустой')
    .strict()
    .trim('Часы работы не должны содержать пробелы')
});

module.exports = {
  userSchema,
  emailSchema,
  passwordSchema,
  categorySchema,
  productSchema,
  editProductSchema,
  toggleDeleteSchema,
  pickupPointSchema,
  editPickupPointSchema
};