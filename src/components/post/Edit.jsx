import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editSVG from '../../assets/edit.svg';

export default function Edit() {
    const history = useHistory();
	const { id } = useParams();
	const messageElementRef = useRef(null);

	// State
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	// Effects
	useEffect(() => {
		// Fetch the post
		fetch(`/api/post/current-for-edit/${id}`)
			.then((response) => response.json())
			.then((res) => {
				setTitle(res.title);
				setBody(res.body);
			});
	}, []);

	// Handler
	const titleHandler = (e) => {
		setTitle(e.target.value);
	};

	const bodyHandler = (e, editor) => {
		setBody(editor.getData());
	};

	const submissionHandler = (e) => {
		e.preventDefault();

		// Create new JSON object to send to backend
		const newPost = {
			title: title,
			body: body,
			postId: id,
		};

		// Send to Backend to update
		fetch('/api/post/update', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify(newPost),
		})
			.then((response) => response.json())
			.then((res) => {
				if (res.postId) {
					history.push(`/post/${res.postId}`);
				}
				if (res.message)
					messageElementRef.current.textContent = res.message;
			});
	};

	return (
		<div id='edit-post-page'>
			<form>
				<h2>Edit post</h2>
				<img src={editSVG} alt='Edit Image' />
				<p className='message' ref={messageElementRef} />
				<label htmlFor='title'>Title</label>
				<input
					onChange={titleHandler}
					value={title}
					type='text'
					name='title'
					id='title-input'
				/>
				<label>Body</label>
				<CKEditor
					editor={ClassicEditor}
					data={body}
					onChange={bodyHandler}
				/>
				<div className='button-list'>
					<button
						onClick={submissionHandler}
						className='button'
						id='save-button'
						type='submit'
					>
						Save
					</button>
					<Link
						to={`/post/${id}`}
						className='button'
						id='cancel-button'
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
