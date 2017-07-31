/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : flaginfo_web

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-31 15:19:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `number` varchar(10) NOT NULL,
  `from` varchar(100) DEFAULT NULL COMMENT '来自何处',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of books
-- ----------------------------

-- ----------------------------
-- Table structure for book_bill
-- ----------------------------
DROP TABLE IF EXISTS `book_bill`;
CREATE TABLE `book_bill` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `book_id` varchar(255) NOT NULL,
  `book_name` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `status` int(10) unsigned zerofill NOT NULL COMMENT '状态',
  `borrow_date` datetime NOT NULL COMMENT '借书时间',
  `return_date` datetime DEFAULT NULL COMMENT '归还时间',
  PRIMARY KEY (`id`),
  KEY `book_bill_ibfk_1` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book_bill
-- ----------------------------

-- ----------------------------
-- Table structure for holiday
-- ----------------------------
DROP TABLE IF EXISTS `holiday`;
CREATE TABLE `holiday` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL COMMENT '外键，关联userid',
  `leave_time` float NOT NULL DEFAULT '0' COMMENT '总共请假时间',
  `total_time` float NOT NULL DEFAULT '0' COMMENT '总共调休时间',
  `surplus_time` float NOT NULL DEFAULT '0' COMMENT '剩余调休时间',
  `month_time` float NOT NULL DEFAULT '0' COMMENT '本月请假时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of holiday
-- ----------------------------

-- ----------------------------
-- Table structure for holiday_bill
-- ----------------------------
DROP TABLE IF EXISTS `holiday_bill`;
CREATE TABLE `holiday_bill` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL COMMENT '外键，关联userid',
  `begin_date` datetime NOT NULL COMMENT '开始时间',
  `end_date` datetime DEFAULT NULL COMMENT '结束时间',
  `content` varchar(255) NOT NULL DEFAULT '0' COMMENT '请假原因',
  `time` float NOT NULL DEFAULT '0' COMMENT '请假时长',
  PRIMARY KEY (`id`),
  KEY `user_id_fk` (`user_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of holiday_bill
-- ----------------------------

-- ----------------------------
-- Table structure for overtime
-- ----------------------------
DROP TABLE IF EXISTS `overtime`;
CREATE TABLE `overtime` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `total_time` float DEFAULT '0' COMMENT '总共加班时间',
  `month_time` float DEFAULT '0' COMMENT '本月加班时间',
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id_fk_overtime` (`user_id`),
  CONSTRAINT `user_id_fk_overtime` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of overtime
-- ----------------------------

-- ----------------------------
-- Table structure for overtime_bill
-- ----------------------------
DROP TABLE IF EXISTS `overtime_bill`;
CREATE TABLE `overtime_bill` (
  `id` varchar(255) NOT NULL,
  `begin_date` datetime NOT NULL COMMENT '开始时间',
  `end_date` datetime DEFAULT NULL COMMENT '结束时间',
  `reason` varchar(255) NOT NULL COMMENT '请假原因',
  `time` float NOT NULL DEFAULT '0' COMMENT '请假时长',
  `user_id` varchar(255) NOT NULL COMMENT '外键，关联userid',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ovbill_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of overtime_bill
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `name` varchar(30) NOT NULL COMMENT '名字',
  `password` varchar(16) NOT NULL,
  `mobile` varchar(11) NOT NULL COMMENT '移动电话',
  `tel` varchar(15) DEFAULT NULL COMMENT '座机',
  `email` varchar(30) NOT NULL COMMENT '邮箱',
  `join_date` date NOT NULL,
  `create_date` date NOT NULL COMMENT '创建时间',
  `update_date` date DEFAULT NULL COMMENT '更新时间',
  `delete_date` date DEFAULT NULL COMMENT '删除时间',
  `role` int(1) NOT NULL COMMENT '角色，0表示超管，1表示普通管理员，2表示普通员工',
  `gender` int(1) NOT NULL COMMENT '性别，0表示男，1表示女',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '001', 'leroy', '000000', '18783838383', '02823659', '123@qq.com', '2017-07-12', '2017-05-24', '2017-05-24', null, '0', '0');
