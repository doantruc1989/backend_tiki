import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { ProductVariant } from 'src/product/entity/productVariant.entity';
import { Repository } from 'typeorm';
import SaveOrderdto from './dto/saveOrder.dto';
import { SearchCartDto } from './dto/searchCart.dto';
import { OrderItem } from './entity/OrderItem';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
  ) {}

  async saveOrder(saveOrderdto: SaveOrderdto) {
    const item = JSON.parse(saveOrderdto.orderItems);
    let revenue: number;
    let totalRevenue: number = 0;

    for (let i = 0; i < item.length; i++) {
      const productId = ((item[i].id).split('.'))[0];
      const qty = item[i].quantity;
      const product = await this.productRepository.findOneBy({
        id: productId
      });
      product.quantity = product.quantity - qty;
      await this.productRepository.save(product);
      revenue = (item[i].price - product.initialPrice) * qty;
      totalRevenue += revenue;
      saveOrderdto.revenue = totalRevenue + saveOrderdto.fee;
      await this.orderItemRepository.save(saveOrderdto);
    }
  }

  async getListOrder(page = 1) {
    return await this.orderItemRepository.find({
      skip: 5 * (page - 1),
      take: 5,
    });
  }

  async getListOrderbyId(id: number) {
    const orders = await this.orderItemRepository
      .createQueryBuilder('order')
      .where({ userId: id })
      .getMany();

    return orders;
  }

  async getorderByid(id: number) {
    const orders = await this.orderItemRepository.findOneBy({ id: id });
    return orders;
  }

  async querySearchOrder(searchCartDto: SearchCartDto) {
    const order = await this.orderItemRepository.createQueryBuilder(
      'OrderItem',
    );
    if (searchCartDto.search === 'adminasc') {
      return order
        .orderBy(`OrderItem.${searchCartDto.sortBy}`, 'ASC')
        .getMany();
    }

    if (searchCartDto.search === 'admindesc') {
      return order
        .orderBy(`OrderItem.${searchCartDto.sortBy}`, 'DESC')
        .getMany();
    }

    if (searchCartDto.search === 'searchall') {
      return order
        .where(`LOWER(userId) LIKE '%${searchCartDto.sortBy}%'`)
        .orWhere(`LOWER(id) LIKE '%${searchCartDto.sortBy}%'`)
        .orWhere(`LOWER(status) LIKE '%${searchCartDto.sortBy}%'`)
        .take(10)
        .getMany();
    }
    return order.getMany();
  }

  async updateOrderByid(id: number, saveOrderdto: SaveOrderdto) {
    const order = await this.orderItemRepository.findOneBy({ id: id });
    order.status = saveOrderdto.status || order.status;
    order.isPaid = saveOrderdto.isPaid ||  order.isPaid;
    return this.orderItemRepository.update(id, order);
  }

  async deletebyId(id: number) {
    return this.orderItemRepository.delete(id);
  }

  async getCountOrder() {
    const countAllOrder = await this.orderItemRepository.count();

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    // const lastMonth = new Date(start);
    // lastMonth.setDate(start.getDate() - field);
    const ordersToday = await this.orderItemRepository
      .createQueryBuilder('order')
      .select('COUNT(order.id)')
      .where(
        `createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getCount();
    return { countAllOrder, ordersToday };
  }

  async adminGetDay() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const sale = await this.orderItemRepository
      .createQueryBuilder('order')
      .where(
        `createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getMany();
    let sales = 0;
    for (let i = 0; i < sale.length; i++) {
      sales += sale[i].cartTotal;
    }

    const revenue = await this.orderItemRepository
      .createQueryBuilder('order')
      .where(
        `createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getMany();
    let revenues = 0;
    for (let i = 0; i < revenue.length; i++) {
      revenues += revenue[i].revenue;
    }

    return { sales, revenues };
  }

  async adminGetWeek() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    const lastweek = new Date(start);
    lastweek.setDate(start.getDate() - 7);
    const sale = await this.orderItemRepository
      .createQueryBuilder('order')
      .where(
        `createdAt BETWEEN '${lastweek.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getMany();
    let sales = 0;
    for (let i = 0; i < sale.length; i++) {
      sales += sale[i].cartTotal;
    }
    const revenue = await this.orderItemRepository
      .createQueryBuilder('order')
      .where(
        `createdAt BETWEEN '${lastweek.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getMany();
    let revenues = 0;
    for (let i = 0; i < revenue.length; i++) {
      revenues += revenue[i].revenue;
    }
    return { sales, revenues };
  }

  async adminGetMonth() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    const lastmonth = new Date(start);
    lastmonth.setDate(start.getDate() - 30);
    const sale = await this.orderItemRepository
      .createQueryBuilder('order')
      .where(
        `createdAt BETWEEN '${lastmonth.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getMany();
    let sales = 0;
    for (let i = 0; i < sale.length; i++) {
      sales += sale[i].cartTotal;
    }
    const revenue = await this.orderItemRepository
      .createQueryBuilder('order')
      .where(
        `createdAt BETWEEN '${lastmonth.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getMany();
    let revenues = 0;
    for (let i = 0; i < revenue.length; i++) {
      revenues += revenue[i].revenue;
    }
    return { sales, revenues };
  }

  //   adminTotalOrder = async (field: number) => {
  //     const start = new Date();
  //     start.setHours(0, 0, 0, 0);
  //     const end = new Date(start);
  //     end.setDate(start.getDate() + 1);
  //     const lastMonth = new Date(start);
  //     lastMonth.setDate(start.getDate() - field);
  //     const order = await this.orderItemRepository
  //       .createQueryBuilder('order')
  //       .select('COUNT(order.id)')
  //       .where(
  //         `createdAt BETWEEN '${lastMonth.toISOString()}' AND '${end.toISOString()}'`,
  //       )
  //       .getCount();
  //     return order;
  //   };

  async checkStatusOrder() {
    const order = await this.orderItemRepository
      .createQueryBuilder('order')
      .where({ status: 0 })
      .take(5)
      .getMany();
    return order;
  }
}
