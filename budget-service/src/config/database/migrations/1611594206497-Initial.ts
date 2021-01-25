import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1611594206497 implements MigrationInterface {
    name = 'Initial1611594206497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `payment-types` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `payment-details` (`id` int NOT NULL AUTO_INCREMENT, `category` varchar(255) NOT NULL, `typeId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `payments` (`id` int NOT NULL AUTO_INCREMENT, `value` decimal(15,2) NOT NULL DEFAULT '0.00', `budgetId` int NOT NULL, `detailsId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `budgets` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `typeId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `budget-types` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `payment-details` ADD CONSTRAINT `FK_6fac7087267d6f1b58dac6edd14` FOREIGN KEY (`typeId`) REFERENCES `payment-types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `payments` ADD CONSTRAINT `FK_501a5128a2238da87b1f7658bc4` FOREIGN KEY (`budgetId`) REFERENCES `budgets`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `payments` ADD CONSTRAINT `FK_5977ba1db586a055fc9ce5ad792` FOREIGN KEY (`detailsId`) REFERENCES `payment-details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `budgets` ADD CONSTRAINT `FK_28d486b3d025a3bf4bbf99f940d` FOREIGN KEY (`typeId`) REFERENCES `budget-types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `budgets` DROP FOREIGN KEY `FK_28d486b3d025a3bf4bbf99f940d`");
        await queryRunner.query("ALTER TABLE `payments` DROP FOREIGN KEY `FK_5977ba1db586a055fc9ce5ad792`");
        await queryRunner.query("ALTER TABLE `payments` DROP FOREIGN KEY `FK_501a5128a2238da87b1f7658bc4`");
        await queryRunner.query("ALTER TABLE `payment-details` DROP FOREIGN KEY `FK_6fac7087267d6f1b58dac6edd14`");
        await queryRunner.query("DROP TABLE `budget-types`");
        await queryRunner.query("DROP TABLE `budgets`");
        await queryRunner.query("DROP TABLE `payments`");
        await queryRunner.query("DROP TABLE `payment-details`");
        await queryRunner.query("DROP TABLE `payment-types`");
    }

}
