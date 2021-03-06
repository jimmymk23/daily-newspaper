const Footer = () => {
	return (
		<footer>
			<p>
				<span className='website-title'>The Daily News</span>
				<span
					className='copyright-symbol'
					dangerouslySetInnerHTML={{ __html: '&copy;' }}
				/>{' '}
				2020 - {new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default Footer;
