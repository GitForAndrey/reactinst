import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div>Топовий Логотипчик</div>
      <nav>
        <ul>
          <Link className="link" to="/">
            Всі пости
          </Link>
          <Link className="link" to="/AuthorAllPosts">
            Мої пости
          </Link>
          <Link className="link" to="/Login">
            Логін
          </Link>
          <li className="link">Вихід</li>
        </ul>
      </nav>
    </div>
  );
};
