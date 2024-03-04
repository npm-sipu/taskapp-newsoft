import { TCommonResponseSchema } from "@/schemas/common.schema";

export const createObjectFromQueryString = (queryString: URLSearchParams) => {
	let obj: TCommonResponseSchema = {};
	queryString.forEach((value, key) => {
		obj[key] = value;
	});
	return obj;
};

//below function is used for adding dynamic key value query strings

// const filterData = (id: string) => {
//     let paramsObj = createObjectFromQueryString(params);
//     let ids = [id.toString()];
//     if (params.has(specname) && params.get(specname) !== "") {
//         let specs = params.get(specname);
//         if (specs?.split(",").includes(id.toString())) {
//             ids = specs.split(",").filter((specs) => specs.toString() !== id.toString());
//         } else {
//             if (specs?.split(",") && specs?.split(",")?.length > 0) {
//                 ids = [...ids, ...specs?.split(",")];
//             }
//         }
//     }
//     paramsObj[specname] = ids.join(",");
//     router.push(path + createQueryStringFromObject(paramsObj));

//     router.refresh();
// };


const findDistance = (a: any, b: any) => {
	if (a.length === 0) return b.length;
	if (b.length === 0) return a.length;

	var matrix: any = [];

	// Initialize matrix
	for (var i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	for (var j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Calculate Levenshtein distance
	for (var i = 1; i <= b.length; i++) {
		for (var j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // Substitution
					matrix[i][j - 1] + 1, // Insertion
					matrix[i - 1][j] + 1 // Deletion
				);
			}
		}
	}

	return matrix[b.length][a.length];
};

// const handleSearchChange = debounce((val: TCommonResponseSchema) => {

// 	let searchPrecedency: number = 2;
// 	if (!val || val.trim() === "") {
// 		setProductsData(productsDataUnfiltered);
// 		setSearchData("");

// 		return;
// 	}

// 	setSearchData(val);

// 	let filteredData: TCommonResponseSchema = [];
// 	let dictObj: any = {};
// 	let dictKeySearch: any = {};
// 	let keyArr: any = [];
// 	let searchVal = val.toUpperCase();
// 	let searchValAll = searchVal.split(" ");

// 	productsDataUnfiltered.map((iProduct: TCommonResponseSchema) => {
// 		let iKey: any = iProduct.productname.trim().toUpperCase();
// 		let iKeyCandidate: any = iKey.split(" ");
// 		dictObj[iKey] = iProduct;

// 		iKeyCandidate.map((iKeyC: TCommonResponseSchema) => {
// 			iKeyC = iKeyC.trim();
// 			if (iKeyC.length !== 0) {
// 				if (!(iKeyC in dictKeySearch)) {
// 					dictKeySearch[iKeyC] = [];
// 				}
// 				dictKeySearch[iKeyC].push(iKey);
// 				keyArr.push(iKeyC);
// 			}
// 		});
// 	});

// 	let added: any = [];
// 	let addedKeys: any = [];

// 	for (var outerLoop = 0; outerLoop < searchValAll.length; outerLoop++) {
// 		for (var i = 0; i < keyArr.length; i++) {
// 			if (keyArr[i].indexOf(searchValAll[outerLoop]) !== -1) {
// 				dictKeySearch[keyArr[i]].map((iKeyC: TCommonResponseSchema) => {
// 					if (!added.includes(iKeyC)) added.push(iKeyC);
// 				});
// 			}
// 		}
// 	}

// 	if (val.length <= searchPrecedency) {
// 		added.map((iA: any) => {
// 			filteredData.push(dictObj[iA]);
// 		});

// 		setSellerProductIds(
// 			filteredData
// 				? filteredData.map((sellerProdId: TCommonResponseSchema) => sellerProdId.sellerproductid)
// 				: []
// 		);

// 		setProductsData(filteredData);

// 		return;
// 	}

// 	for (outerLoop = 0; outerLoop < searchValAll.length; outerLoop++) {
// 		if (outerLoop !== 0) {
// 			addedKeys = added;
// 			added = [];
// 		}

// 		for (var i = 0; i < keyArr.length; i++) {
// 			var distance = findDistance(searchValAll[outerLoop], keyArr[i]);
// 			if (distance <= searchPrecedency) {
// 				let allProducts = dictKeySearch[keyArr[i]];
// 				allProducts.map((iiProducts: TCommonResponseSchema) => {
// 					if (!added.includes(iiProducts)) {
// 						added.push(iiProducts);
// 					}
// 				});
// 			}
// 		}

// 		if (outerLoop !== 0) {
// 			let finalArray: any = [];
// 			addedKeys.map((iA: any) => {
// 				if (added.includes(iA)) finalArray.push(iA);
// 			});

// 			added = finalArray;
// 		}
// 	}

// 	added.map((iA: any) => {
// 		filteredData.push(dictObj[iA]);
// 	});

// 	setProductsData(filteredData);

// 	setSellerProductIds(
// 		filteredData
// 			? filteredData.map((sellerProdId: TCommonResponseSchema) => sellerProdId.sellerproductid)
// 			: []
// 	);
// }, 500);

// const handleSearchChange = (val: TCommonResponseSchema) => {
// 	let searchPrecedency: number = 3;
// 	if (!val || val.trim() === "") {
// 		setProductsData(productsDataUnfiltered);
// 		setSearchData("");

// 		return;
// 	}

// 	setSearchData(val);

// 	let filteredData: TCommonResponseSchema = [];
// 	let dictObj: any = {};
// 	let searchVal = val.toUpperCase();
// 	let searchValKeys = searchVal.split(" ");
// 	let searchValLength = searchVal.length;

// 	productsDataUnfiltered.map((iProduct: TCommonResponseSchema) => {
// 		let iKey: any = iProduct.productname.trim().toUpperCase();
// 		dictObj[iKey] = iProduct;
// 	});

// 	let added: any = [];

// 	productsDataUnfiltered.map((iProduct: TCommonResponseSchema) => {
// 		let iKey: any = iProduct.productname.trim().toUpperCase();
// 		if (!added.includes(iKey)) {
// 			let bFound = true;
// 			for (let loopCnt = 0; loopCnt < searchValKeys.length; loopCnt++) {
// 				if (iKey.indexOf(searchValKeys[loopCnt]) === -1) {
// 					bFound = false;
// 					break;
// 				}
// 			}

// 			if (bFound) added.push(iKey);
// 		}
// 	});

// 	for (var outerLoop = 0; outerLoop <= searchPrecedency; outerLoop++) {
// 		productsDataUnfiltered.map((iProduct: TCommonResponseSchema) => {
// 			let iKey: any = iProduct.productname.trim().toUpperCase();
// 			if (!added.includes(iKey)) {
// 				var keyLength = iKey.length;
// 				var lenDiff =
// 					keyLength - searchValLength < 0
// 						? searchValLength - keyLength
// 						: keyLength - searchValLength;

// 				var distance = findDistance(iKey, searchVal);
// 				if (lenDiff + outerLoop === distance) added.push(iKey);
// 			}
// 		});
// 	}

// 	added.map((iA: any) => {
// 		filteredData.push(dictObj[iA]);
// 	});

// 	// console.log("added", added);
// 	setProductsData([]);
// 	//let newv = [...filteredData];
// 	setTimeout(() => {
// 		setProductsData(filteredData);
// 	}, 100);
// 	//setProductsData(newv);

// 	setSellerProductIds(
// 		filteredData
// 			? filteredData.map((sellerProdId: TCommonResponseSchema) => sellerProdId.sellerproductid)
// 			: []
// 	);
// };
