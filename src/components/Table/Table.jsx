import React from 'react'
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid'
import { Box, CircularProgress } from '@mui/material'

function Table({ rows, columns }) {
    console.log(columns)
    return (
        <div>
            {
                rows && columns && <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            }
            {
                !rows && <div style={{ display: "flex", justifyContent: "center" }}><CircularProgress /></div>
            }
        </div>
    )
}
Table.propTypes = {
    rows: PropTypes.any,
    columns: PropTypes.any,
};

export default Table
