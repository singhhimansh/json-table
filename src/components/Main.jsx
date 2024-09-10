import React from "react";
import { Tabularise } from "./Tabularise/Tabularise";
import { users } from "./../assets/sampeJson";
import { Chip } from "./Chip";
import { useState } from "react";
import { useCallback } from "react";

const Main = () => {
  const usersData = users;
  const [selectedRows, setSelectedRows] = useState({ rows: [], ids: [] });
  const handleRowSelect = useCallback(
    (checked, row) => {
      if (checked) {
        setSelectedRows((prev) => ({
          rows: [...prev.rows, row],
          ids: [...prev.ids, row.id],
        }));
      } else {
        setSelectedRows((prev) => ({
          rows: prev.rows.filter((r) => r.id !== row.id),
          ids: prev.ids.filter((id) => id !== row.id),
        }));
      }
      return;
    },
    [setSelectedRows]
  );
  console.log("selectedRows: ", selectedRows);


  // Table schema to dispaly table content in corresponding column 
  const columns = [
    {
      key: "id",
      headerName: "",
      Component: ({ row }) => {
        return (
          <input
            type="checkbox"
            style={{ cursor: "pointer" }}
            checked={selectedRows.ids.includes(row.id)}
            onChange={(e) => handleRowSelect(e.target.checked, row)}
          />
        );
      },
    },
    {
      key: "name",
      headerName: "User Name",
      Component: ({ row }) => {
        return (
          <div>
            <p
              style={{
                paddingBottom: "4px",
                margin: 0,
              }}
            >
              {row.name}
            </p>
            <p
              style={{
                color: "slate",
                fontSize: "12px",
                padding: 0,
                margin: 0,
                fontWeight: "lighter",
              }}
            >
              {row.username}
            </p>
          </div>
        );
      },
    },
    {
      key: "status",
      headerName: "Status",
      filter: false,
      Component: ({ row }) => {
        return <Chip label={row.status} />;
      },
    },
    {
      key: "email",
      headerName: "Email",
    },
    {
      key: "role",
      headerName: "Role",
    },
    {
      key: "teams",
      headerName: "Teams",
      Component: ({ row }) => {
        return (
          <div style={{ display: "flex", gap: "2px" }}>
            {row.teams?.map((team) => (
              <Chip label={team} />
            ))}
          </div>
        );
      },
    },
    {
      key: "location",
      headerName: "Location",
    },
  ];

  return (
    <div className="container">
      <Tabularise columns={columns} data={usersData} pageSize={5} />
      <div className="displayContainer">
        <p
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          <b>Selected Rows: </b>{" "}
          {selectedRows.rows.map((row) => row.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Main;
