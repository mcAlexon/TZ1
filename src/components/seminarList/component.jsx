import { useEffect, useState } from "react";
import { SeminarItem } from "../seminarItem/component";
import { SeminarModal } from "../seminarModal/component";
import classname from "classname";
import styles from "./styles.module.scss";

export const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null); // Состояние для выбранного семинара
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модалки

  const fetchSeminars = async () => {
    try {
      const response = await fetch("http://localhost:5000/seminars");
      const data = await response.json();
      setSeminars(data); // Обновляем список семинаров
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/seminars")
      .then((res) => res.json())
      .then((data) => setSeminars(data))
      .catch((error) => console.error("Ошибка загрузки данных:", error)) //Подумал, что реактивность при изменении json не будет лишней.
      fetchSeminars();
    
     // Таймер для периодического опроса каждые 5 секунд. 
      const intervalId = setInterval(() => {
        fetchSeminars();
      }, 5000); // 5000 мс = 5 секунд

    
    return () => clearInterval(intervalId);
  }, []);

  // Обработчик открытия модалки для редактирования
  const handleEdit = (seminar) => {
    console.log("Семинар выбран для редактирования:", seminar); // Логирование выбранного семинара
    setSelectedSeminar(seminar);
    setIsModalOpen(true); 
  };

  const handleDelete = (seminarId) => {
    // Фильтруем список, исключая удалённый семинар
    setSeminars((prev) => prev.filter((seminar) => seminar.id !== seminarId));
  };

  // Обработчик сохранения изменений
  const handleSave = (updatedSeminar) => {
    setSeminars(seminars.map((seminar) => 
      seminar.id === updatedSeminar.id ? updatedSeminar : seminar
    ));
  };

  // Обработчик закрытия модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className={classname(styles.title)}>Список семинаров</h1>
      <div className={classname(styles.list)}>
        {seminars.length > 0 ? (
          seminars.map((seminar) => (
            <SeminarItem key={seminar.id} seminar={seminar} onEdit={handleEdit} onConfirm={handleDelete}/>
          ))
        ) : (
          <p>Загрузка...</p>
        )}
      </div>

      {/* Модалка для редактирования */}
      {isModalOpen && selectedSeminar && (
        <SeminarModal
          seminar={selectedSeminar}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
