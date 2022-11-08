import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { resetActiveUser } from "../features/userSlice";

export const Header = ({ isAuth }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(resetActiveUser());
  };
  const authHeader = (
    <nav>
      <NavLink className="link" to="/" end>
        Всі пости
      </NavLink>
      <NavLink className="link" to="/AuthorAllPosts">
        Мої пости
      </NavLink>
      <li className="link" onClick={() => handleLogOut()}>
        Вихід
      </li>
    </nav>
  );
  const header = (
    <nav>
      <NavLink className="link" to="/" end>
        Всі пости
      </NavLink>

      <NavLink className="link" to="/Login">
        Логін
      </NavLink>
    </nav>
  );
  return (
    <div className="header">
      <div>Топовий Логотипчик</div>
      {isAuth ? authHeader : header}
    </div>
  );
};
