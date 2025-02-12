import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MaterialTable from 'material-table';
import { Grid } from '@mui/material';
import { useStyles } from '../../../../../styles/bookings/Index.style';
import { TopBar } from '../../../../../src/components/navigation/TopBar';
import { MenuBar } from '../../../../../src/components/navigation/MenuBar';
import { tableIcons } from '../../../../../src/components/table/MaterialTable';
import { getBookingsByGymId } from '../../../../../src/utils/fetchApi/bookings';
import jwtDecode from '../../../../../src/utils/jwtDecode/jwtDecode';

export default function BookingsSuperAdmin() {
  const classes = useStyles();
  const router = useRouter();
  const gymId = router.query.id;
  const [bookings, setBookings] = useState([]);
  const [alertBookings, setAlertBookings] = useState({
    status: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { Superadmin: superadmin } = jwtDecode();
    if (!superadmin) router.push('/superadmin/login');
    else setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (gymId)
      getBookingsByGymId(setLoading, setBookings, gymId, { limit: 0 });
  }, [gymId]);

  return (
    isAuthenticated && (
      <div className={classes.root}>
        <Head>
          <title>bookings Page</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <TopBar />

        <main className={classes.main}>
          <Grid container spacing={2} m={2}>
            <Grid item xs={3}>
              <MenuBar selected={'Clubs'} />
            </Grid>
            <Grid item xs={9}>
              <MaterialTable
                className={classes.table}
                title='Bookings'
                icons={tableIcons}
                columns={[
                  { title: 'Id', field: 'id', width: '10%' },
                  { title: 'Class', field: 'class.name' },
                  {
                    title: 'Payment Id',
                    field: 'payment_id',
                    width: '10%',
                  },
                  { title: 'User Id', field: 'user_id', width: '10%' },
                  { title: 'Schedule', field: 'class.schedules[0].time_schedule' },
                ]}
                data={bookings}
                actions={[
                  // {
                  //   icon: tableIcons.ListAlt,
                  //   tooltip: 'View Classes',
                  //   onClick: (event, rowData) => router.push(`/superadmin/clubs/${rowData.id}/classes`),
                  // },
                  // {
                  //   icon: tableIcons.Edit,
                  //   tooltip: 'Edit Club',
                  //   onClick: (event, rowData) => router.push(`/superadmin/clubs/${rowData.id}/edit`),
                  // },
                  // (rowData) => ({
                  //   icon: tableIcons.Delete,
                  //   tooltip: 'Delete Club',
                  //   onClick: (event, rowData) => {
                  //     const isDelete = confirm(`You want to delete ${rowData.name}(id: ${rowData.id}) ?`);
                  //     if (isDelete) {
                  //       const success = handleDelete(rowData.id);
                  //       if (success) alert(`You deleted ${rowData.name}(id: ${rowData.id})`);
                  //       else alert(`Can't delete ${rowData.name}(id: ${rowData.id})`);
                  //     }
                  //   },
                  //   // disabled: rowData.birthYear < 2000
                  // }),
                  // {
                  //   icon: tableIcons.Add,
                  //   tooltip: 'Add New Club',
                  //   isFreeAction: true,
                  //   onClick: (event) => router.push('/superadmin/bookings/add'),
                  // },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </Grid>
          </Grid>
        </main>
      </div>
    )
  );
}
