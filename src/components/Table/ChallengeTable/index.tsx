import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { CodeSnippet, Snippet } from '../../../Types/Snippet';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface Data {
    id: number;
    title: string;
    language: string;
    createdAt: number;
    difficulty: number;
}

function createData(snippet: Snippet | CodeSnippet): Data {
    if ('difficulty' in snippet)
        return {
            id: snippet.id,
            title: snippet.title.toLowerCase(),
            language: snippet.language.name,
            createdAt: moment(snippet.createdAt).valueOf(),
            difficulty: snippet.difficulty.value
        };
    return {
        id: snippet.id,
        title: snippet.title.toLowerCase(),
        language: snippet.language.name,
        createdAt: moment(snippet.createdAt).valueOf(),
        difficulty: -1
    };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCellsSnippet: readonly HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'NAME'
    },
    {
        id: 'language',
        numeric: true,
        disablePadding: false,
        label: 'LANGUAGE'
    },
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'DATE'
    }
];

const headCellsCode: readonly HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'NAME'
    },
    {
        id: 'language',
        numeric: true,
        disablePadding: false,
        label: 'LANGUAGE'
    },
    {
        id: 'difficulty',
        numeric: true,
        disablePadding: false,
        label: 'DIFFICULTY'
    },
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'DATE'
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCellType: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCellType
    } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    const headCells =
        headCellType === 'snippet' ? headCellsSnippet : headCellsCode;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    {headCellType === 'snippet' && (
                        <Checkbox
                            color='primary'
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts'
                            }}
                        />
                    )}
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    showToolbarOptions: boolean;
    numSelected: number;
    tableName: string;
    deleteSnippets: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, showToolbarOptions, tableName, deleteSnippets } =
        props;

    const deleteAvailable = numSelected && showToolbarOptions;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        )
                })
            }}
        >
            {deleteAvailable ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                    {tableName}
                </Typography>
            )}
            {deleteAvailable ? (
                <Tooltip title='Delete' onClick={deleteSnippets}>
                    <IconButton>
                        <DeleteIcon style={{ color: 'red' }} />
                    </IconButton>
                </Tooltip>
            ) : null}
            {showToolbarOptions ? (
                <Tooltip title='Add'>
                    <Link
                        to='/newSnippet'
                        style={{
                            fontSize: 'large'
                        }}
                    >
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

type Props<T = Snippet | CodeSnippet> = {
    type: string;
    list: T[];
    tableName: string;
    // TODO perform dispatch to delete
    performDispatch: (snippetsToDelete: readonly string[]) => void;
};

export default function EnhancedTable(props: Props) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = props.list.map((snip): Data => createData(snip));
    const difficulty = [
        { label: 'Easy', color: 'green' },
        { label: 'Medium', color: 'orange' },
        { label: 'Hard', color: 'red' }
    ];

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id.toString());
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        console.log(name);
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {/* pass down prop here */}
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    showToolbarOptions={props.type === 'snippet' ? true : false}
                    deleteSnippets={() => props.performDispatch(selected)}
                    tableName={props.tableName}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCellType={props.type}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(
                                        row.id.toString()
                                    );
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(
                                                    event,
                                                    row.id.toString()
                                                )
                                            }
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding='checkbox'>
                                                {props.type === 'snippet' && (
                                                    <Checkbox
                                                        color='primary'
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby':
                                                                labelId
                                                        }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                            >
                                                <Link
                                                    to={
                                                        props.type === 'snippet'
                                                            ? `/snippets/${row.id}`
                                                            : `/challenges/${row.id}`
                                                    }
                                                >
                                                    {row.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell align='right'>
                                                {row.language}
                                            </TableCell>
                                            {props.type === 'code' && (
                                                <TableCell
                                                    align='right'
                                                    style={{
                                                        color: `${
                                                            difficulty[
                                                                row.difficulty
                                                            ].color
                                                        }`
                                                    }}
                                                >
                                                    {
                                                        difficulty[
                                                            row.difficulty
                                                        ].label
                                                    }
                                                </TableCell>
                                            )}
                                            <TableCell align='right'>
                                                {moment(row.createdAt).format(
                                                    'DD-MM-YY, HH:MM:ss'
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label='Dense padding'
            />
        </Box>
    );
}
