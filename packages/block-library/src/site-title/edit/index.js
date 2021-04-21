/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import {
	RichText,
	AlignmentControl,
	HeadingLevelControl,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';

export default function SiteTitleEdit( {
	attributes,
	setAttributes,
	insertBlocksAfter,
} ) {
	const { level, textAlign } = attributes;
	const [ title, setTitle ] = useEntityProp( 'root', 'site', 'title' );
	const TagName = level === 0 ? 'p' : `h${ level }`;
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	return (
		<>
			<BlockControls group="block">
				<HeadingLevelControl
					selectedLevel={ level }
					onChange={ ( newLevel ) =>
						setAttributes( { level: newLevel } )
					}
					isParagraphAllowed
				/>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<TagName { ...blockProps }>
				<RichText
					tagName="a"
					style={ { display: 'inline-block' } }
					aria-label={ __( 'Site title text' ) }
					placeholder={ __( 'Write site title…' ) }
					value={ title }
					onChange={ setTitle }
					allowedFormats={ [] }
					disableLineBreaks
					__unstableOnSplitAtEnd={ () =>
						insertBlocksAfter(
							createBlock( getDefaultBlockName() )
						)
					}
				/>
			</TagName>
		</>
	);
}
