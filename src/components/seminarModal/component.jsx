import { useState } from "react";
import PropTypes from "prop-types";
import classname from "classname";
import styles from "./styles.module.scss";

export const SeminarModal = ({ seminar, onClose, onSave }) => {
  // Тут я сделал проверку на правильность данных, в Html существует input type="date", можно было проще сделать.
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Проверяем, есть ли дата вообще
  
    // Если дата уже в формате YYYY-MM-DD, просто возвращаем её
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
  
    // Если дата в формате DD.MM.YYYY, то конвертируем её
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
      return dateString.split(".").reverse().join("-");
    }
  
    return ""; // Если формат неизвестен, возвращаем пустую строку
  };
  // Состояния для редактирования данных семинара
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [photo, setPhoto] = useState(seminar.photo);
  const [date, setDate] = useState(formatDate(seminar.date));
  const [time, setTime] = useState(seminar.time);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  // Обработчики изменений в полях ввода
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handlePhotoChange = (e) => {
    setPhoto(e.target.value); 
  };

  // Обработчик сохранения данных
  const handleSave = async () => {
    setIsLoading(true);
    const updatedSeminar = { ...seminar, title, description, photo, date, time  };
    //PUT запрос
    try {
      const response = await fetch(`http://localhost:5000/seminars/${seminar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSeminar),
      });

      if (!response.ok) throw new Error("Ошибка при обновлении семинара");

      const updatedData = await response.json();
      onSave(updatedData); // Передаём обновлённые данные в родительский компонент
      onClose(); 
    } catch (error) {
      console.error("Ошибка обновления:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className={classname(styles.modal)}>
      <div className={classname(styles.modalContent)}>
        <h2>Редактировать семинар</h2>
        <input
          type="text"
          value={photo}
          onChange={handlePhotoChange}
          placeholder="Ссылка на фото"
        />
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Название семинара"
        />
        <textarea
          className={classname(styles.description)}
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Описание семинара"
        />
        <input 
          type="date" 
          value={date}
          onChange={handleDateChange}
        />
        <input 
          type="time" 
          value={time}
          onChange={handleTimeChange}
        />
        <div className={classname(styles.buttons)}>
        <button className={classname(styles.buttonSave)} onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
        <button className={classname(styles.buttonClose)} onClick={onClose} disabled={isLoading}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

SeminarModal.propTypes = {
  seminar: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
