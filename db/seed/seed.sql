
CREATE TABLE public.orders (
	id serial4 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	qty_products int4 NULL,
	value numeric NULL,
	CONSTRAINT orders_pk PRIMARY KEY (id)
);

CREATE TABLE public."types" (
	id serial4 NOT NULL,
	"type" varchar NOT NULL,
	tax numeric NOT NULL,
	CONSTRAINT types_pk PRIMARY KEY (id)
);

CREATE TABLE public.products (
	id serial4 NOT NULL,
	product varchar NOT NULL,
	id_type int4 NOT NULL,
	price numeric NOT NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
);

CREATE TABLE public.order_products (
	id serial4 NOT NULL,
	id_order int4 NOT NULL,
	id_product int4 NOT NULL,
	quantity int4 NULL,
	CONSTRAINT orders_products_pk PRIMARY KEY (id),
	CONSTRAINT order_products_fk FOREIGN KEY (id_order) REFERENCES public.orders(id),
	CONSTRAINT order_products_fk_1 FOREIGN KEY (id_product) REFERENCES public.products(id)
);

INSERT INTO public.orders (created_at,qty_products,value) VALUES
	 ('2023-11-07 01:53:37.272137',10,18.4),
	 ('2023-11-07 15:39:41',3,2.241),
	 ('2023-11-07 15:41:31',3,0.447),
	 ('2023-11-07 15:41:53',1,0.747),
	 ('2023-11-07 15:43:06',3,0.597),
	 ('2023-11-07 15:43:36',1,0.747),
	 ('2023-11-07 15:44:11',2,1.494),
	 ('2023-11-07 15:49:55',30,22.41),
	 ('2023-11-07 15:50:45',8,8.379),
	 ('2023-11-07 15:53:29',6,8.488);
INSERT INTO public.orders (created_at,qty_products,value) VALUES
	 ('2023-11-07 15:53:59',4,2.988),
	 ('2023-11-07 15:54:38',1,0.747),
	 ('2023-11-07 17:41:36',1,0.599);

INSERT INTO public."types" ("type",tax) VALUES
	 ('Groceries',0.1),
	 ('Eletronics',0.2),
	 ('Books',0.05),
	 ('Clothing',0.15),
	 ('Alcohol',0.3),
	 ('Other',0.1);

INSERT INTO public.products (product,id_type,price) VALUES
	 ('Crispy Fried Onions',1,3.47),
	 ('Milk',1,1.99),
	 ('Beer',5,2.49),
	 ('Rock T-Shirt',4,12.99),
	 ('Bananas',1,1.49),
	 ('Magic beans',6,5.99),
	 ('Potatoes',1,2.79);

INSERT INTO public.order_products (id_order,id_product,quantity) VALUES
	 (1,3,4),
	 (1,2,1),
	 (8,3,30),
	 (9,3,6),
	 (9,4,2),
	 (10,1,2),
	 (10,4,4),
	 (11,3,3),
	 (11,3,1),
	 (12,3,1);
INSERT INTO public.order_products (id_order,id_product,quantity) VALUES
	 (13,6,1);



