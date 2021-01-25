import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1611589769301 implements MigrationInterface {
    name = 'Initial1611589769301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `payment-types` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `payment-details` (`id` int NOT NULL AUTO_INCREMENT, `category` varchar(255) NOT NULL, `typeId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `payments` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `value` decimal(15,2) NOT NULL DEFAULT '0.00', `date` date NOT NULL, `detailsId` int NOT NULL, `accountId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `accounts` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `payment-details` ADD CONSTRAINT `FK_6fac7087267d6f1b58dac6edd14` FOREIGN KEY (`typeId`) REFERENCES `payment-types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `payments` ADD CONSTRAINT `FK_5977ba1db586a055fc9ce5ad792` FOREIGN KEY (`detailsId`) REFERENCES `payment-details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `payments` ADD CONSTRAINT `FK_4634839a93faaa2b163c1215f0b` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `payments` DROP FOREIGN KEY `FK_4634839a93faaa2b163c1215f0b`");
        await queryRunner.query("ALTER TABLE `payments` DROP FOREIGN KEY `FK_5977ba1db586a055fc9ce5ad792`");
        await queryRunner.query("ALTER TABLE `payment-details` DROP FOREIGN KEY `FK_6fac7087267d6f1b58dac6edd14`");
        await queryRunner.query("DROP TABLE `accounts`");
        await queryRunner.query("DROP TABLE `payments`");
        await queryRunner.query("DROP TABLE `payment-details`");
        await queryRunner.query("DROP TABLE `payment-types`");
    }

}
