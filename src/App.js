import React , { useState , useEffect } from "react";
import "./App.css";

function Titles()
  {
  const titles = ["Company" , "Email" , "Name" , "Title" , "Phone"];
    return (
      <div className="container_list_item">{titles.map((title , step) =>
        {
        return <div key={step} className="container_list_title">{title}</div>
        })}
      </div>
      );
  }

function Items(props)
  {
  const [ attribute , setAttribute ] = useState("container_list_cell");
  useEffect(() =>
    {
    setAttribute("container_list_cell container_list_cell_animate");
    } , [props.page]);
  return props.items.map((item , index) =>
    {
    if(index < 10)
      {
      return (
        <div className="container_list_item" key={item.ID}>
          <div className={attribute}>{item.Company}</div>
          <div className={attribute}>{item.Email}</div>
          <div className={attribute}>{item.FirstNameLastName}</div>
          <div className={attribute}>{item.JobTitle}</div>
          <div className={attribute}>{item.Phone}</div>
        </div>);
      }
    });
  }

function Button(props)
  {
  function click()
    {
    if(props.flag == 1)
      {
      props.setPage(props.page + 1);
      }
    else if(props.page > 0)
      {
      props.setPage(props.page - 1);
      }
    }
  return <button className="container_controls_button" onClick={click}>{props.text}</button>;
  }

function App()
  {
  const [ page , setPage ] = useState(0);
  const [ items , setItems ] = useState([]);
  useEffect(() =>
    {
    fetch("https://give-me-users-forever.herokuapp.com/api/users/" + (page * 10) + "/next").then(request => request.json()).then(response => setItems(response.users));
    } , [page]);
  return (
    <div className="container">
      <div className="container_list">
        <Titles/><Items page={page} items={items}/>
      </div>
      <div className="container_controls">
        <Button page={page} setPage={setPage} setItems={setItems} flag="0" text="<"/>
        <Button page={page} setPage={setPage} setItems={setItems} flag="1" text=">"/>
      </div>
    </div>
    );
  }

export default App;