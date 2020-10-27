import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getPlaylistId } from '@/lib/util';

export default function IndexPage() {
	const [ url, setUrl ] = useState( '' );
	const [ length, setLength ] = useState( 60 );
	const [ isError, setError ] = useState( false );
	const router = useRouter();

	const handleSubmit = ( event ) => {
		event.preventDefault();

		const id = getPlaylistId( url );

		if ( id ) {
			router.push( {
				pathname: `/tape/${ id }`,
				query: { length },
			} );
		} else {
			setError( true );
		}
	};

	return (
		<div className="font-sans antialiased flex max-w-2xl mx-auto mt-10">
			<Head>
				<title>Create a Tape</title>
			</Head>
			<div className="w-full">
				<h1 className="font-bold text-5xl text-center text-accent-1 mb-4">
					Create a Tape
				</h1>
				<form className="flex" onSubmit={ handleSubmit }>
					<input
						className="bg-gray-200 appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-red-500"
						type="url"
						name="q"
						value={ url || '' }
						onChange={ ( event ) => setUrl( event.target.value ) }
						placeholder="Give us a Spotify playlist URL and we'll help pack your tapes with tunes."
					/>
					<select
						className="bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 ml-2 rounded lfocus:outline-none focus:border-red-500"
						id="length"
						value={ length }
						onChange={ ( event ) =>
							setLength( event.target.value )
						}
					>
						<option value="60">C60</option>
						<option value="90">C90</option>
						<option value="120">C120</option>
					</select>
					<button className="bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
						Submit
					</button>
				</form>
				{ isError && (
					<div
						className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 mt-2"
						role="alert"
					>
						<p>Incorrect Spotify playlist URL.</p>
					</div>
				) }
			</div>
		</div>
	);
}
