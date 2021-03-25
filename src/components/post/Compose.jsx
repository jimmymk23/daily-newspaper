import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import postSVG from '../../assets/post.svg';
import { useHistory } from 'react-router-dom';

export default function Compose() {
	const history = useHistory();

	// State
	const [title, setTitle] = useLocalStorage('title', '');
	const [body, setBody] = useLocalStorage('body', '');
	const [type, setType] = useState('article');

	// Handlers
	const titleHandler = (e) => {
		setTitle(e.target.value);
	};

	const bodyHandler = (e, editor) => {
		setBody(editor.getData());
	};

	const radioHandler = (e) => {
		setType(e.target.value);
	};

	const publishHandler = (e, status) => {
		e.preventDefault();

		const newPost = { title, body, type, status };

		// Send to Backend for submission
		fetch('/api/post/publish', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify(newPost),
		})
			.then((response) => response.json())
			.then((res) => {
				history.push(`/post/${res.postId}`);
			});
	};

	return (
		<div className='createPost'>
			<form>
				<h2>Compose new post</h2>
				<img src={postSVG} alt='Post Image' />

				<label>Choose a post type</label>
				<div className='radio-list'>
					<label className='radio'>
						<input
							type='radio'
							className='hidden'
							checked={type === 'article'}
							onChange={radioHandler}
							value='article'
						/>
						<span className='label'></span>News Article
					</label>
					<label className='radio'>
						<input
							type='radio'
							className='hidden'
							checked={type === 'review'}
							onChange={radioHandler}
							value='review'
						/>
						<span className='label'></span>Review
					</label>
				</div>
				<label htmlFor='title'>Title</label>
				<input
					value={title}
					onChange={titleHandler}
					type='text'
					name='title'
					id='title-input'
				/>
				<label>Content</label>
				<CKEditor
					editor={ClassicEditor}
					data={body}
					onChange={bodyHandler}
				/>
				<div className='button-list'>
					<button
						onClick={(e) => publishHandler(e, 'published')}
						className='button'
						id='submit-button'
						type='submit'
					>
						Publish
					</button>
					<button
						onClick={(e) => publishHandler(e, 'draft')}
						className='button secondary-bttn'
                        id='save-button'
                        type='submit'
					>
						Save to Drafts
					</button>
				</div>
			</form>
		</div>
	);
}
