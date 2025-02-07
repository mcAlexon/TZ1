# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


1) Так как React Нужен для реактивного обновления данных на странице, то я сделал реактивное отображение/изменение. С помощью fetch и Put запросов и обновляю json данные.
2) В модалке для редактирования я сделал input type date. Не знаю на сколько использовать встройку лучше, Я не поправил моментик, в котором данные отправляются через тире YYYY-MM-DD. Потому что с json приходит инфа в формате YYYY.MM.DD. Это легко меняется просто мне захотелось сделать именно так. 
3) Использовал три функциональных компонента SeminarItem, SeminarList, SeminarModal. Компонент Confirmation должен был стать окном подтверждения от кнопки удаления, однако мне показалось это излишним.
4) Так как это ТЗ то использовать webpack мне показалось излишним, ибо нужно было бы лезть под капот и настраивать. Vite альтернатива попроще. 
5) Api я реализовал очень простенько