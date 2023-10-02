/*  BASE DE DATOS */
const db = require('../database/models');


const fs = require('fs');
const path = require('path');
const { readJSON, writeJSON } = require('../data');
const { unlinkSync, existsSync } = require('fs')


const products = readJSON("./productsDataBase.json");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {

		db.Product.findAll()
			.then(products => {
				return res.render("products", {
					products,
					toThousand
				})
			})
			.catch(error => console.log(error))
	},
	// Detail - Detail from one product
	detail: (req, res) => {

		db.Product.findByPk(req.params.id)
			.then(product => {
				res.render('detail',{
					...product.dataValues,
					toThousand
			})	
		})
		.catch(error => console.log(error))
	},
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, description, category} = req.body;
		let newProduct =  {
			id : products[products.length - 1].id + 1,
			name : name.trim(),
			price : +price,
			discount : +discount,
			category,
			description : description.trim(),
			image: req.file ? req.file.filename : null
		}
		products.push(newProduct)
		writeJSON(products, 'productsDataBase.json')
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = products.find(product => product.id === +req.params.id)
		res.render('product-edit-form',{
		...product
		})
	},
	// Update - Method to update
	update: (req, res) => {

		const {name, price, discount, description, category} = req.body;

		const productsModify = products.map(product => {

			if(product.id === +req.params.id){
				product.name = name.trim();
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description.trim();
				req.file &&
                existsSync(`./public/images/${product.image}`) && 
                unlinkSync(`./public/images/${product.image}`);
			}
			return product
		})
		writeJSON(productsModify, 'productsDataBase.json')
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productsModify = products.filter(product => {
			if (product.id === +req.params.id){
				existsSync(`./public/images/products/${product.image}`) && 
                unlinkSync(`./public/images/products/${product.image}`);
			}
			return product.id !== +req.params.id;
		})
		writeJSON(productsModify, 'productsDataBase.json')
		res.redirect('/products')
	},
};

module.exports = controller;