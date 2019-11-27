import React, { useEffect, useState, Fragment } from "react";

const Search = ({ onSubmit, onChange, clearInput, symbol }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="input-group">
        <input
          value={symbol}
          className="form-control"
          type="text"
          name="symbol"
          placeholder="Stock symbol"
          onChange={onChange}
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

export default Search;
