import React, { useState, useEffect } from "react";
import * as apiaxios from "../../../api/service";

export default function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const [idcourse, setIdcourse] = useState([]);
  useEffect(() => {
    apiaxios
      .batchHome(`internshipcourse/${urlParams.get("id")}`, null)
      .then((res) => {
        localStorage.setItem("idBatch", urlParams.get("id"));
        setIdcourse(res.data.data);
      });
  }, []);
  return (
    <>
      <div>
        <h3>CHÀO MỪNG BẠN ĐÃ ĐẾN VỚI {idcourse.nameCoure}</h3>
      </div>
    </>
  );
}
