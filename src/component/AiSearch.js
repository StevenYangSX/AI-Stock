import React, { useEffect, useState, Fragment } from "react";

const AiSearch = ({ onAiSubmit, onAiChange, aiDay }) => {
  return (
    <div>
      <form onSubmit={onAiSubmit} className="input-group">
        <input
          value={aiDay}
          className="form-control"
          type="text"
          name="number"
          placeholder="See prediction on next ... days"
          onChange={onAiChange}
        />
        <span classname="input-group-btn">
          <input
            type="submit"
            className="btn btn-outline-primary"
            value="Show"
          />
        </span>
      </form>
    </div>
  );
};
export default AiSearch;
