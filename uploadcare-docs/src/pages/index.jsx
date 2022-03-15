import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import css from './style.module.css'

export default function Home() {
	const { siteConfig } = useDocusaurusContext()
	return (
		<Layout>
			<main className={css.root}>
				<h1 className={css.h1}>Uploadcare Docs</h1>
				<p className={css.p}>
					Welcome to Uploadcare documentation — the complete repository of guides and details
					about how to use every Uploadcare product.
				</p>
				<section className={css.grid}>
					<Link className={css.link} to="/docs/core/quickStart">
						<span className={css.emoji}>🏎</span>
						<span className={css.linkLabel}>Quick Start</span>
					</Link>
					<Link className={css.link} to="/docs/core/accountAndProjects">
						<span className={css.emoji}>🗄</span>
						<span className={css.linkLabel}>Account and Projects</span>
					</Link>
					<Link className={css.link} to="/docs/core/uploader">
						<span className={css.emoji}>🚀</span>
						<span className={css.linkLabel}>Uploader</span>
					</Link>
					<Link className={css.link} to="/docs/core/deliveryAndCDN">
						<span className={css.emoji}>🚚</span>
						<span className={css.linkLabel}>Delivery and CDN</span>
					</Link>
					<Link className={css.link} to="/docs/core/uploader">
						<span className={css.emoji}>🤖</span>
						<span className={css.linkLabel}>REST API</span>
					</Link>
				</section>
				<h2 className={css.h2}>Platform</h2>
				<section className={css.grid}>
					<Link className={css.link} to="/docs/platform/platform/imageTransformations">
						<span className={css.emoji}>🎛</span>
						<span className={css.linkLabel}>Image transformations</span>
					</Link>
					<Link className={css.link} to="/docs/platform/imageEditorUI">
						<span className={css.emoji}>🎨</span>
						<span className={css.linkLabel}>Image Editor UI</span>
					</Link>
					<Link className={css.link} to="/docs/platform/documentConversion">
						<span className={css.emoji}>📄</span>
						<span className={css.linkLabel}>Document conversion</span>
					</Link>
					<Link className={css.link} to="/docs/platform/videoProcessing">
						<span className={css.emoji}>🎞</span>
						<span className={css.linkLabel}>Video processing</span>
					</Link>
					<Link className={css.link} to="/docs/platform/deviceAwareDelivery">
						<span className={css.emoji}>🧠</span>
						<span className={css.linkLabel}>Device-aware Delivery</span>
					</Link>
					<Link className={css.link} to="/docs/platform/aiImageRecognition">
						<span className={css.emoji}>👁</span>
						<span className={css.linkLabel}>AI Image Recognition</span>
					</Link>
				</section>
			</main>
		</Layout>
	)
}
