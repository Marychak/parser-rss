import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MaterialReactTable from 'material-react-table';
import Button from "@mui/material/Button";
import {Box, IconButton, Tooltip} from "@mui/material";
import {Delete, Edit} from '@mui/icons-material';

import {fetchPosts, fetchRemovePost, updatePosts} from "../redux/slices/posts";
import {logout} from "../redux/slices/auth";
import axios from "../axios";

import {defaultSort, columns} from "./costants";

export const Posts = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState(defaultSort);
    const dispatch = useDispatch();
    const {items, totalCount, isLoading} = useSelector((state) => state.posts);

    React.useEffect(() => {
        dispatch(fetchPosts({pagination, sorting}));
    }, [dispatch, pagination, sorting]);

    const onClickLogout = () => {
        if (window.confirm('Are you sure you want to go out?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    const stateMemo = useMemo(() => ({
        pagination,
        sorting,
        isLoading
    }), [pagination, sorting, isLoading]);

    const handleSaveRow = async ({exitEditingMode, values}) => {
        try {
            await axios.put(`/posts/${values['_id']}`, values);
            dispatch(updatePosts(values));
        } catch (err) {
            console.warn(err);
            alert('Ошибка при создании статьи!');
        } finally {
            exitEditingMode()
        }
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !window.confirm(`Are you sure you want to delete ${row.getValue('guid')}`)
            ) {
                return;
            }
            dispatch(fetchRemovePost(row.getValue('_id'))).then(() => {
                dispatch(fetchPosts({pagination, sorting}))
            });
        },
        [dispatch, pagination, sorting],
    );

    const handleCancelRowEdits = () => {
    };

    const getRowActions = useCallback(({row, table}) => (
        <Box sx={{display: 'flex', gap: '1rem'}}>
            <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit/>
                </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                    <Delete/>
                </IconButton>
            </Tooltip>
        </Box>
    ), [handleDeleteRow]);

    return (
        <>
            <Button onClick={onClickLogout}>
                Logout
            </Button>
            <MaterialReactTable
                columns={columns}
                data={items}
                manualPagination
                manualSorting
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={+totalCount}
                enableEditing
                onEditingRowSave={handleSaveRow}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={getRowActions}
                state={stateMemo}
            />
        </>
    );
};