
import React, { useEffect } from 'react'
import {
	Avatar,
	Button,
	TextField,
	Box,
	Grid,
	Typography,
	FormControlLabel,
	Checkbox,
	makeStyles
} from '@material-ui/core/'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons/'
import { NPLink } from '../shared'

import Copyright from '../shared/Copyright'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	paper: {
		margin: theme.spacing(8, 4),
		...theme.mixins.flexy('column wrap', 'center', 'center')
	},
	avatar: {
		margin: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	wrapper: {
		overflow: 'hidden'
	},
	video: {
		height: '100%',
		width: '177.77777778vh',
		minWidth: '100%',
	},
	body: {
		overflowY: 'hidden',
		overflowX: 'hidden'
	}
}))

const Login = () => {
	const classes = useStyles()

	useEffect(() => { document.body.className = classes.body }, [classes.body])

	return <div className={classes.paper}>
		<Avatar className={classes.avatar}>
			<LockOutlinedIcon />
		</Avatar>
		<Typography component="h1" variant="h5">
			Login
        </Typography>
		<form className={classes.form} noValidate>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
			/>
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			>
				Sign In
            			</Button>
			<Grid container>
				<Grid item xs>
					<NPLink to="#">
						Forgot password?
                	</NPLink>
				</Grid>
				<Grid item>
					<NPLink routeName="register">
						{"Don't have an account? Sign Up"}
					</NPLink>
				</Grid>
			</Grid>
			<Box mt={5}>
				<Copyright />
			</Box>
		</form>
	</div>
}

export default Login
