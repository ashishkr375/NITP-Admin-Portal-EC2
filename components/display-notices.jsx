import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import {
	Delete,
	Edit,
	Flag,
	Link,
	Star,
	StarBorder,
	VisibilityOff,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: `${theme.spacing(1)} auto`,
		padding: theme.spacing(2),
		lineHeight: 1.5,
	},
	truncate: {
		display: `block`,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: `nowrap`,
	},
	icon: {
		display: `block`,
		fontSize: `2rem`,
		marginLeft: `auto`,
		marginRight: `auto`,
	},
}));

const AddAttachments = () => {
	const [fields, setFields] = useState([{ value: null }]);

	function handleChange(i, event) {
		const values = [...fields];
		values[i].value = event.target.value;
		setFields(values);
	}

	function handleAdd() {
		const values = [...fields];
		values.push({ value: null });
		setFields(values);
	}

	function handleRemove(i) {
		const values = [...fields];
		values.splice(i, 1);
		setFields(values);
	}

	return (
		<>
			<Button variant="contained" color="primary" onClick={() => handleAdd()}>
				+ Add Attachments
			</Button>
			{fields.map((field, idx) => {
				return (
					<React.Fragment>
						<TextField
							placeholder="SubTitle"
							fullWidth
							onChange={(e) => handleChange(idx, e)}
							style={{ margin: `8px` }}
						/>
						<TextField type="file" style={{ margin: `8px` }} />
						<Button
							type="button"
							onClick={() => handleRemove(idx)}
							style={{ display: `inline-block`, fontSize: `1.5rem` }}
						>
							<Delete color="secondary" />{" "}
						</Button>
					</React.Fragment>
				);
			})}
		</>
	);
};

const dateformatter = (date) => {
	var format_date = new Date(date);
	var dd = format_date.getDate();

	var mm = format_date.getMonth() + 1;
	var yyyy = format_date.getFullYear();
	if (dd < 10) {
		dd = Number("0" + dd);
	}

	if (mm < 10) {
		mm = Number("0" + mm);
	}
	return yyyy + "-" + mm + "-" + dd;
};

const AddForm = ({ handleClose, modal }) => {
	return (
		<>
			<Dialog open={modal} onClose={handleClose}>
				<DialogTitle disableTypography style={{ fontSize: `2rem` }}>
					Add Notice
				</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						id="label"
						label="Title"
						type="text"
						fullWidth
						defaultValue={"title"}
					/>
					<TextField
						margin="dense"
						id="openDate"
						label="Open Date"
						type="date"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="closeDate"
						label="Close Date"
						margin="dense"
						type="date"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<FormControlLabel
						control={<Checkbox name="important" />}
						label="Important"
					/>
					<h2>Attachments</h2>
					<AddAttachments />
					{/* <a href={data.attachments} target="__blank">
							<FontAwesomeIcon icon={faExternalLinkAlt} />
						</a> */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

const EditForm = ({ data, handleClose, modal }) => {
	let openDate = dateformatter(data.openDate);
	// console.log(data.openDate);
	const [important, setImportant] = useState(data.important);

	let closeDate = dateformatter(data.closeDate);
	const handleChange = () => {
		setImportant(!important);
	};

	return (
		<>
			<Dialog open={modal} onClose={handleClose}>
				<DialogTitle disableTypography style={{ fontSize: `2rem` }}>
					Edit Notice
					<Delete color="secondary" />
				</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						id="label"
						label="Title"
						type="text"
						fullWidth
						defaultValue={data.title}
					/>{" "}
					<TextField
						margin="dense"
						id="openDate"
						label="Open Date"
						type="date"
						fullWidth
						defaultValue={openDate}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="closeDate"
						label="Close Date"
						margin="dense"
						type="date"
						fullWidth
						defaultValue={closeDate}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={important}
								onChange={handleChange}
								name="important"
							/>
						}
						label="Important"
					/>
					<h2>Attachments</h2>
					<TextField
						id="attachments"
						margin="dense"
						type="text"
						defaultValue={"Download"}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<a href={data.attachments} target="__blank">
						<Link />
					</a>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

const DataDisplay = (props) => {
	const classes = useStyles();
	const [details, setDetails] = useState(props.data);

	const [addModal, setAddModal] = useState(false);
	const addModalOpen = () => {
		setAddModal(true);
	};
	const handleCloseAddModal = () => {
		setAddModal(false);
	};

	return (
		<div>
			<header>
				<Typography variant="h4" style={{ margin: `15px 0` }}>
					Recent Notices
				</Typography>
				<Button variant="contained" color="primary" onClick={addModalOpen}>
					ADD +
				</Button>
			</header>

			<AddForm handleClose={handleCloseAddModal} modal={addModal} />

			<Grid container spacing={3} className={classes.root}>
				{details.map((detail) => {
					let openDate = new Date(detail.timestamp);
					let dd = openDate.getDate();
					let mm = openDate.getMonth() + 1;
					let yyyy = openDate.getFullYear();
					openDate = dd + "/" + mm + "/" + yyyy;

					const [editModal, setEditModal] = useState(false);

					const editModalOpen = () => {
						setEditModal(true);
					};

					const handleCloseEditModal = () => {
						setEditModal(false);
					};

					return (
						<React.Fragment key={detail.id}>
							<Grid item xs={12} sm={6} lg={9}>
								<Paper className={classes.paper}>
									<span className={classes.truncate}>{detail.title}</span>
									<Flag />
									<a href={detail.attachments}> Download</a>
									<span style={{ float: "right" }}>{openDate}</span>
								</Paper>
							</Grid>
							<Grid item xs={4} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center` }}
								>
									{detail.isVisible ? (
										<>
											<Visibility className={classes.icon} />
											{/* <i className="fa fa-eye" style={{ color: "action" }}></i> */}
											<span>Visible</span>
										</>
									) : (
										<>
											{/* <i
												className="fa fa-eye-slash"
												style={{ color: "secondary" }}
											></i> */}
											<VisibilityOff
												color="secondary"
												className={classes.icon}
											/>
											<span>Archive</span>
										</>
									)}
								</Paper>
							</Grid>
							<Grid item xs={4} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center` }}
								>
									{detail.important ? (
										<>
											<Star className={classes.icon} />
											{/* <i className="fa fa-star" style={{ color: "secondary" }}></i> */}
											<span>Important</span>
										</>
									) : (
										<>
											{/* <i className="fa fa-star" style={{ color: "action" }}></i> */}
											<StarBorder className={classes.icon} />
											<span>Normal</span>
										</>
									)}
								</Paper>{" "}
							</Grid>
							<Grid item xs={4} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center`, cursor: `pointer` }}
									onClick={editModalOpen}
								>
									<Edit className={classes.icon} /> <span>Edit</span>
								</Paper>{" "}
								<EditForm
									data={detail}
									modal={editModal}
									handleClose={handleCloseEditModal}
								/>
							</Grid>
						</React.Fragment>
					);
				})}
				{/* <Grid >
            <Paper xs={12} sm={9}>{detail.title}</Paper>
         </Grid> */}
			</Grid>
		</div>
	);
};

export default DataDisplay;