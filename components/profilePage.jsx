"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const profilePage = () => {
  const { userList, authenticated } = useSelector((state) => state?.user);
  const router = useRouter();
  const [searchedTerm, setSearchedTerm] = useState("");

  const columns = [
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      editable: true,
    },
  ];

  let filteredUserList = searchedTerm.length
    ? userList?.filter(
        (list) =>
          list?.firstName.toLowerCase().includes(searchedTerm.toLowerCase()) ||
          list?.lastName.toLowerCase().includes(searchedTerm.toLowerCase())
      )
    : userList;

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: "50px" }}>
      {!userList.length ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            pt: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              zIndex: 999,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "start" },
              height: "80px",
              backgroundColor: "#6366f1",
              px: { xs: "5px", md: "30px" },
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "25px", color: "#f4f4f4" }}
            >
              KernelPi
            </Typography>
          </Box>
          <Box sx={{ width: "100%", height: "600px", my: "80px" }}>
            <TextField
              sx={{ mb: "20px" }}
              size="small"
              placeholder="Type to search..."
              value={searchedTerm}
              onChange={(e) => setSearchedTerm(e.target.value)}
            />
            <DataGrid
              rows={filteredUserList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              sx={{ overflow: "auto" }}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default profilePage;
