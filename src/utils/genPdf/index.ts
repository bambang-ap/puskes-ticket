import jsPDF from 'jspdf';

import {GenPdfOpts} from '@appTypes/app.type';
import {paperA4} from '@constants';

import {calibri_normal} from './calibri-normal.ttf';

export async function generatePDF(ids: string[], options?: GenPdfOpts) {
	const {
		filename = 'a4',
		orientation = 'p',
		paperSize = paperA4,
	} = options ?? {};

	const isPortrait = orientation === 'p' || orientation === 'portrait';

	let doc = new jsPDF({unit: 'mm', orientation, format: paperSize});

	doc.addFileToVFS(calibri_normal.filename, calibri_normal.font);
	doc.addFont(
		calibri_normal.filename,
		calibri_normal.id,
		calibri_normal.fontStyle,
	);

	const pageHeight = doc.internal.pageSize.getHeight();
	const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
	const scaleWidth = isPortrait ? paperSize[0] : paperSize[1];

	for (let index = 0; index < elements.length; index++) {
		const element = elements[index];
		if (index + 1 < elements.length) doc.addPage(paperSize, orientation);
		doc = await htmlPage(doc, element!, index);
	}

	return doc.save(filename, {returnPromise: true});

	function htmlPage(pdf: jsPDF, element: HTMLElement, i: number) {
		const width = element.clientWidth;

		pdf.setFont(calibri_normal.id);
		return new Promise<jsPDF>(resolve => {
			const newElement = `
				<style>
					* {
						font-family: Calibri, sans-serif !important;
					}
				</style>
				${element.outerHTML}
			`;

			pdf.html(newElement, {
				x: 0,
				margin: 0,
				y: i * pageHeight,
				html2canvas: {width, scale: scaleWidth / width},
				callback(pdfCallback) {
					resolve(pdfCallback);
				},
			});
		});
	}
}
