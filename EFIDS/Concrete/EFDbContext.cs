namespace EFIDS.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFIDS.Entities;
    using System.Collections.Generic;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=IDS")
        {
        }

        // SAP Входящая поставка
        public virtual DbSet<SAPIncomingSupply> SAPIncomingSupply { get; set; }

        // RWT
        public virtual DbSet<Arrival_UZ_Cont_Pay> Arrival_UZ_Cont_Pay { get; set; }
        public virtual DbSet<Arrival_UZ_Document> Arrival_UZ_Document { get; set; }
        public virtual DbSet<Arrival_UZ_Document_Acts> Arrival_UZ_Document_Acts { get; set; }
        public virtual DbSet<Arrival_UZ_Document_Docs> Arrival_UZ_Document_Docs { get; set; }
        public virtual DbSet<Arrival_UZ_Document_Pay> Arrival_UZ_Document_Pay { get; set; }
        public virtual DbSet<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }
        public virtual DbSet<Arrival_UZ_Vagon_Acts> Arrival_UZ_Vagon_Acts { get; set; }
        public virtual DbSet<Arrival_UZ_Vagon_Cont> Arrival_UZ_Vagon_Cont { get; set; }
        public virtual DbSet<Arrival_UZ_Vagon_Pay> Arrival_UZ_Vagon_Pay { get; set; }

        public virtual DbSet<ArrivalCars> ArrivalCars { get; set; }
        public virtual DbSet<ArrivalSostav> ArrivalSostav { get; set; }
        public virtual DbSet<UZ_DOC> UZ_DOC { get; set; }

        public virtual DbSet<Outgoing_UZ_Cont_Pay> Outgoing_UZ_Cont_Pay { get; set; }
        public virtual DbSet<Outgoing_UZ_Document> Outgoing_UZ_Document { get; set; }
        public virtual DbSet<Outgoing_UZ_Document_Pay> Outgoing_UZ_Document_Pay { get; set; }
        public virtual DbSet<Outgoing_UZ_Vagon> Outgoing_UZ_Vagon { get; set; }
        public virtual DbSet<Outgoing_UZ_Vagon_Acts> Outgoing_UZ_Vagon_Acts { get; set; }
        public virtual DbSet<Outgoing_UZ_Vagon_Cont> Outgoing_UZ_Vagon_Cont { get; set; }
        public virtual DbSet<Outgoing_UZ_Vagon_Pay> Outgoing_UZ_Vagon_Pay { get; set; }

        public virtual DbSet<OutgoingCars> OutgoingCars { get; set; }
        public virtual DbSet<OutgoingSostav> OutgoingSostav { get; set; }
        public virtual DbSet<OutgoingDetentionReturn> OutgoingDetentionReturn { get; set; }
        public virtual DbSet<UZ_DOC_OUT> UZ_DOC_OUT { get; set; }

        // Задержания - возвраты
        public virtual DbSet<Directory_DetentionReturn> Directory_DetentionReturn { get; set; }
        // Письма
        public virtual DbSet<InstructionalLetters> InstructionalLetters { get; set; }
        public virtual DbSet<InstructionalLettersWagon> InstructionalLettersWagon { get; set; }

        // Внутренее перемещение
        public virtual DbSet<WagonInternalMovement> WagonInternalMovement { get; set; }
        public virtual DbSet<WagonInternalOperation> WagonInternalOperation { get; set; }
        public virtual DbSet<WagonInternalRoutes> WagonInternalRoutes { get; set; }

        // MORS
        public virtual DbSet<CardsWagons> CardsWagons { get; set; }
        public virtual DbSet<CardsWagonsRepairs> CardsWagonsRepairs { get; set; }
        public virtual DbSet<ParksListWagons> ParksListWagons { get; set; }
        public virtual DbSet<ParksWagons> ParksWagons { get; set; }
        public virtual DbSet<WagonsMotionSignals> WagonsMotionSignals { get; set; }

        // Справочники
        public virtual DbSet<Directory_Divisions> Directory_Divisions { get; set; }
        public virtual DbSet<Directory_TypeDivision> Directory_TypeDivision { get; set; }

        public virtual DbSet<Directory_Station> Directory_Station { get; set; }
        //public virtual DbSet<Directory_ParkWay> Directory_ParkWay { get; set; }
        public virtual DbSet<Directory_ParkWays> Directory_ParkWays { get; set; }
        public virtual DbSet<Directory_Ways> Directory_Ways { get; set; }
        public virtual DbSet<Directory_OuterWays> Directory_OuterWays { get; set; }
        // Локомотивы
        public virtual DbSet<Directory_Locomotive> Directory_Locomotive { get; set; }
        public virtual DbSet<Directory_LocomotiveStatus> Directory_LocomotiveStatus { get; set; }

        public virtual DbSet<Directory_Cargo> Directory_Cargo { get; set; }
        public virtual DbSet<Directory_CargoETSNG> Directory_CargoETSNG { get; set; }
        public virtual DbSet<Directory_CargoGNG> Directory_CargoGNG { get; set; }
        public virtual DbSet<Directory_CargoGroup> Directory_CargoGroup { get; set; }
        public virtual DbSet<Directory_Consignee> Directory_Consignee { get; set; }
        public virtual DbSet<Directory_Shipper> Directory_Shipper { get; set; }
        public virtual DbSet<Directory_ExternalStation> Directory_ExternalStation { get; set; }
        public virtual DbSet<Directory_InlandRailway> Directory_InlandRailway { get; set; }
        public virtual DbSet<Directory_Railway> Directory_Railway { get; set; }
        public virtual DbSet<Directory_BorderCheckpoint> Directory_BorderCheckpoint { get; set; }
        //public virtual DbSet<Directory_PayerArrival> Directory_PayerArrival { get; set; }
        public virtual DbSet<Directory_PayerSender> Directory_PayerSender { get; set; }
        public virtual DbSet<Directory_Wagons> Directory_Wagons { get; set; }
        public virtual DbSet<Directory_WagonsRent> Directory_WagonsRent { get; set; }
        public virtual DbSet<Directory_Countrys> Directory_Countrys { get; set; }
        public virtual DbSet<Directory_GenusWagons> Directory_GenusWagons { get; set; }
        public virtual DbSet<Directory_TypeWagons> Directory_TypeWagons { get; set; }
        public virtual DbSet<Directory_OperatorsWagons> Directory_OperatorsWagons { get; set; }
        public virtual DbSet<Directory_OwnersWagons> Directory_OwnersWagons { get; set; }
        public virtual DbSet<Directory_LimitingLoading> Directory_LimitingLoading { get; set; }
        public virtual DbSet<Directory_WagonsCondition> Directory_WagonsCondition { get; set; }
        public virtual DbSet<Directory_SpecialConditions> Directory_SpecialConditions { get; set; }
        public virtual DbSet<Directory_ConditionArrival> Directory_ConditionArrival { get; set; }
        public virtual DbSet<Directory_CertificationData> Directory_CertificationData { get; set; }
        public virtual DbSet<Directory_CommercialCondition> Directory_CommercialCondition { get; set; }
        public virtual DbSet<Directory_HazardClass> Directory_HazardClass { get; set; }

        public virtual DbSet<Directory_LessorsWagons> Directory_LessorsWagons { get; set; }
        public virtual DbSet<Directory_ModelsWagons> Directory_ModelsWagons { get; set; }
        public virtual DbSet<Directory_PoligonTravelWagons> Directory_PoligonTravelWagons { get; set; }
        public virtual DbSet<Directory_TypeOwnerShip> Directory_TypeOwnerShip { get; set; }
        public virtual DbSet<Directory_DEPO> Directory_DEPO { get; set; }
        public virtual DbSet<Directory_TypesRepairsWagons> Directory_TypesRepairsWagons { get; set; }
        public virtual DbSet<Directory_WagonManufacturers> Directory_WagonManufacturers { get; set; }

        public virtual DbSet<Directory_WagonLoadingStatus> Directory_WagonLoadingStatus { get; set; }
        public virtual DbSet<Directory_WagonOperations> Directory_WagonOperations { get; set; }

        public virtual DbSet<Directory_Reason_Discrepancy> Directory_Reason_Discrepancy { get; set; }
        // Состояние парка
        public virtual DbSet<ParkState_Station> ParkState_Station { get; set; }
        public virtual DbSet<ParkState_Wagon> ParkState_Wagon { get; set; }
        public virtual DbSet<ParkState_Way> ParkState_Way { get; set; }

        // !!! временно для совмещения справочника КИС и ИДС
        public virtual DbSet<Directory_Cars_KIS> Directory_Cars_KIS { get; set; }
        // Доступ к сайту
        public virtual DbSet<WebAccess> WebAccess { get; set; }
        public virtual DbSet<WebView> WebView { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            #region СОСТОЯНИЕ ПАРКА
            modelBuilder.Entity<ParkState_Station>()
                .HasMany(e => e.ParkState_Way)
                .WithRequired(e => e.ParkState_Station)
                .HasForeignKey(e => e.id_park_state_station)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ParkState_Way>()
                .HasMany(e => e.ParkState_Wagon)
                .WithRequired(e => e.ParkState_Way)
                .HasForeignKey(e => e.id_park_state_way)
                .WillCascadeOnDelete(false);
            #endregion

            #region Внутренее перемещение
            modelBuilder.Entity<WagonInternalMovement>()
                .HasMany(e => e.WagonInternalMovement1)
                .WithOptional(e => e.WagonInternalMovement2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<WagonInternalOperation>()
                .HasMany(e => e.WagonInternalOperation1)
                .WithOptional(e => e.WagonInternalOperation2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<WagonInternalRoutes>()
                .HasMany(e => e.WagonInternalMovement)
                .WithRequired(e => e.WagonInternalRoutes)
                .HasForeignKey(e => e.id_wagon_internal_routes)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<WagonInternalRoutes>()
                .HasMany(e => e.WagonInternalOperation)
                .WithRequired(e => e.WagonInternalRoutes)
                .HasForeignKey(e => e.id_wagon_internal_routes)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<WagonInternalRoutes>()
                .HasMany(e => e.WagonInternalRoutes1)
                .WithOptional(e => e.WagonInternalRoutes2)
                .HasForeignKey(e => e.parent_id);
            #endregion

            #region ПРИБЫТИЕ

            #region Arrival
            modelBuilder.Entity<ArrivalCars>()
                .HasMany(e => e.SAPIncomingSupply)
                .WithRequired(e => e.ArrivalCars)
                .HasForeignKey(e => e.id_arrival_car)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ArrivalCars>()
                .HasMany(e => e.WagonInternalRoutes)
                .WithOptional(e => e.ArrivalCars)
                .HasForeignKey(e => e.id_arrival_car);

            modelBuilder.Entity<ArrivalSostav>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithRequired(e => e.ArrivalSostav)
                .HasForeignKey(e => e.id_arrival)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ArrivalSostav>()
                .HasMany(e => e.ArrivalCars)
                .WithOptional(e => e.ArrivalSostav)
                .HasForeignKey(e => e.id_arrival);

            modelBuilder.Entity<UZ_DOC>()
                .HasMany(e => e.Arrival_UZ_Document)
                .WithRequired(e => e.UZ_DOC)
                .HasForeignKey(e => e.id_doc_uz)
                .WillCascadeOnDelete(false);

            #endregion

            #region ArrivalSAP
            modelBuilder.Entity<SAPIncomingSupply>()
                .HasMany(e => e.WagonInternalRoutes)
                .WithOptional(e => e.SAPIncomingSupply)
                .HasForeignKey(e => e.id_sap_incoming_supply);
            #endregion

            #region ArrivalDOC
            modelBuilder.Entity<Arrival_UZ_Document>()
                .HasMany(e => e.Arrival_UZ_Document_Acts)
                .WithRequired(e => e.Arrival_UZ_Document)
                .HasForeignKey(e => e.id_document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Arrival_UZ_Document>()
                .HasMany(e => e.Arrival_UZ_Document1)
                .WithOptional(e => e.Arrival_UZ_Document2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<Arrival_UZ_Document>()
                .HasMany(e => e.Arrival_UZ_Document_Docs)
                .WithRequired(e => e.Arrival_UZ_Document)
                .HasForeignKey(e => e.id_document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Arrival_UZ_Document>()
                .HasMany(e => e.Arrival_UZ_Document_Pay)
                .WithRequired(e => e.Arrival_UZ_Document)
                .HasForeignKey(e => e.id_document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Arrival_UZ_Document>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithRequired(e => e.Arrival_UZ_Document)
                .HasForeignKey(e => e.id_document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Arrival_UZ_Document_Docs>()
                .Property(e => e.doc)
                .IsFixedLength();

            modelBuilder.Entity<Arrival_UZ_Vagon>()
                .Property(e => e.danger)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Arrival_UZ_Vagon>()
                .Property(e => e.danger_kod)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Arrival_UZ_Vagon>()
                .HasMany(e => e.Arrival_UZ_Vagon_Acts)
                .WithRequired(e => e.Arrival_UZ_Vagon)
                .HasForeignKey(e => e.id_vagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Arrival_UZ_Vagon>()
                .HasMany(e => e.Arrival_UZ_Vagon_Cont)
                .WithRequired(e => e.Arrival_UZ_Vagon)
                .HasForeignKey(e => e.id_vagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Arrival_UZ_Vagon>()
                .HasMany(e => e.Arrival_UZ_Vagon_Pay)
                .WithRequired(e => e.Arrival_UZ_Vagon)
                .HasForeignKey(e => e.id_vagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Arrival_UZ_Vagon>()
                .HasMany(e => e.ArrivalCars)
                .WithOptional(e => e.Arrival_UZ_Vagon)
                .HasForeignKey(e => e.id_arrival_uz_vagon);

            modelBuilder.Entity<Arrival_UZ_Vagon_Cont>()
                .HasMany(e => e.Arrival_UZ_Cont_Pay)
                .WithRequired(e => e.Arrival_UZ_Vagon_Cont)
                .HasForeignKey(e => e.id_cont)
                .WillCascadeOnDelete(false);
            #endregion

            #endregion

            #region ОТПРАВКА

            #region Outgoing
            modelBuilder.Entity<OutgoingSostav>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithRequired(e => e.OutgoingSostav)
                .HasForeignKey(e => e.id_outgoing)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<OutgoingSostav>()
                .HasMany(e => e.OutgoingCars)
                .WithOptional(e => e.OutgoingSostav)
                .HasForeignKey(e => e.id_outgoing);

            modelBuilder.Entity<OutgoingCars>()
                .HasMany(e => e.WagonInternalRoutes)
                .WithOptional(e => e.OutgoingCars)
                .HasForeignKey(e => e.id_outgoing_car);

            modelBuilder.Entity<OutgoingDetentionReturn>()
                .HasMany(e => e.OutgoingCars)
                .WithOptional(e => e.OutgoingDetentionReturn)
                .HasForeignKey(e => e.id_outgoing_detention);

            modelBuilder.Entity<OutgoingDetentionReturn>()
                .HasMany(e => e.OutgoingCars1)
                .WithOptional(e => e.OutgoingDetentionReturn1)
                .HasForeignKey(e => e.id_outgoing_return_start);

            modelBuilder.Entity<OutgoingDetentionReturn>()
                .HasMany(e => e.OutgoingCars2)
                .WithOptional(e => e.OutgoingDetentionReturn2)
                .HasForeignKey(e => e.id_outgoing_return_stop);


            #endregion

            #region OutgoingDoc
            modelBuilder.Entity<Outgoing_UZ_Document>()
                .HasMany(e => e.Outgoing_UZ_Document_Pay)
                .WithRequired(e => e.Outgoing_UZ_Document)
                .HasForeignKey(e => e.id_document)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Outgoing_UZ_Document>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithOptional(e => e.Outgoing_UZ_Document)
                .HasForeignKey(e => e.id_document);

            modelBuilder.Entity<Outgoing_UZ_Vagon>()
                .HasMany(e => e.OutgoingCars)
                .WithOptional(e => e.Outgoing_UZ_Vagon)
                .HasForeignKey(e => e.id_outgoing_uz_vagon);

            modelBuilder.Entity<Outgoing_UZ_Vagon>()
                .HasMany(e => e.Outgoing_UZ_Vagon_Acts)
                .WithRequired(e => e.Outgoing_UZ_Vagon)
                .HasForeignKey(e => e.id_vagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Outgoing_UZ_Vagon>()
                .HasMany(e => e.Outgoing_UZ_Vagon_Cont)
                .WithRequired(e => e.Outgoing_UZ_Vagon)
                .HasForeignKey(e => e.id_vagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Outgoing_UZ_Vagon>()
                .HasMany(e => e.Outgoing_UZ_Vagon_Pay)
                .WithRequired(e => e.Outgoing_UZ_Vagon)
                .HasForeignKey(e => e.id_vagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Outgoing_UZ_Vagon_Cont>()
                .HasMany(e => e.Outgoing_UZ_Cont_Pay)
                .WithRequired(e => e.Outgoing_UZ_Vagon_Cont)
                .HasForeignKey(e => e.id_cont)
                .WillCascadeOnDelete(false);
            #endregion

            #endregion

            #region Письма InstructionalLetters
            modelBuilder.Entity<InstructionalLetters>()
                .HasMany(e => e.InstructionalLettersWagon)
                .WithRequired(e => e.InstructionalLetters)
                .HasForeignKey(e => e.id_instructional_letters)
                .WillCascadeOnDelete(false);
            #endregion

            #region СПРАВОЧНИКИ ИДС

            #region Погран переходы Directory_BorderCheckpoint
            modelBuilder.Entity<Directory_BorderCheckpoint>()
                .HasMany(e => e.Arrival_UZ_Document)
                .WithOptional(e => e.Directory_BorderCheckpoint)
                .HasForeignKey(e => e.code_border_checkpoint);

            modelBuilder.Entity<Directory_BorderCheckpoint>()
                .HasMany(e => e.Outgoing_UZ_Document)
                .WithOptional(e => e.Directory_BorderCheckpoint)
                .HasForeignKey(e => e.code_border_checkpoint);
            #endregion

            #region Грузы Directory_Cargo
            modelBuilder.Entity<Directory_Cargo>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_Cargo)
                .HasForeignKey(e => e.id_cargo);

            modelBuilder.Entity<Directory_Cargo>()
                .HasMany(e => e.Arrival_UZ_Vagon_Cont)
                .WithOptional(e => e.Directory_Cargo)
                .HasForeignKey(e => e.id_cargo);

            modelBuilder.Entity<Directory_Cargo>()
                .HasMany(e => e.Outgoing_UZ_Vagon_Cont)
                .WithOptional(e => e.Directory_Cargo)
                .HasForeignKey(e => e.id_cargo);

            modelBuilder.Entity<Directory_Cargo>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithOptional(e => e.Directory_Cargo)
                .HasForeignKey(e => e.id_cargo);
            #endregion

            #region Грузы Directory_CargoETSNG
            modelBuilder.Entity<Directory_CargoETSNG>()
                .HasMany(e => e.Directory_Cargo)
                .WithRequired(e => e.Directory_CargoETSNG)
                .HasForeignKey(e => e.id_cargo_etsng)
                .WillCascadeOnDelete(false);
            #endregion

            #region Грузы Directory_CargoGNG
            modelBuilder.Entity<Directory_CargoGNG>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_CargoGNG)
                .HasForeignKey(e => e.id_cargo_gng);

            modelBuilder.Entity<Directory_CargoGNG>()
                .HasMany(e => e.Arrival_UZ_Vagon_Cont)
                .WithOptional(e => e.Directory_CargoGNG)
                .HasForeignKey(e => e.id_cargo_gng);

            modelBuilder.Entity<Directory_CargoGNG>()
                .HasMany(e => e.Outgoing_UZ_Vagon_Cont)
                .WithOptional(e => e.Directory_CargoGNG)
                .HasForeignKey(e => e.id_cargo_gng);

            modelBuilder.Entity<Directory_CargoGNG>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithOptional(e => e.Directory_CargoGNG)
                .HasForeignKey(e => e.id_cargo_gng);
            #endregion

            #region Directory_CargoGroup
            modelBuilder.Entity<Directory_CargoGroup>()
                .HasMany(e => e.Directory_Cargo)
                .WithRequired(e => e.Directory_CargoGroup)
                .HasForeignKey(e => e.id_group)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_CertificationData
            modelBuilder.Entity<Directory_CertificationData>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_CertificationData)
                .HasForeignKey(e => e.id_certification_data);
            #endregion

            #region Directory_CommercialCondition
            modelBuilder.Entity<Directory_CommercialCondition>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_CommercialCondition)
                .HasForeignKey(e => e.id_commercial_condition);
            #endregion

            #region Directory_ConditionArrival
            modelBuilder.Entity<Directory_ConditionArrival>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_ConditionArrival)
                .HasForeignKey(e => e.id_condition);

            modelBuilder.Entity<Directory_ConditionArrival>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithOptional(e => e.Directory_ConditionArrival)
                .HasForeignKey(e => e.id_condition);

            modelBuilder.Entity<Directory_ConditionArrival>()
                .HasMany(e => e.WagonInternalOperation)
                .WithRequired(e => e.Directory_ConditionArrival)
                .HasForeignKey(e => e.id_condition)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_Consignee
            modelBuilder.Entity<Directory_Consignee>()
                .HasMany(e => e.Arrival_UZ_Document)
                .WithOptional(e => e.Directory_Consignee)
                .HasForeignKey(e => e.code_consignee);

            modelBuilder.Entity<Directory_Consignee>()
                .HasMany(e => e.Outgoing_UZ_Document)
                .WithOptional(e => e.Directory_Consignee)
                .HasForeignKey(e => e.code_shipper);

            #endregion

            #region Directory_Countrys
            modelBuilder.Entity<Directory_Countrys>()
                .HasMany(e => e.Directory_Railway)
                .WithRequired(e => e.Directory_Countrys)
                .HasForeignKey(e => e.id_countrys)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Countrys>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithRequired(e => e.Directory_Countrys)
                .HasForeignKey(e => e.id_countrys)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Countrys>()
                .HasMany(e => e.Directory_Wagons)
                .WithRequired(e => e.Directory_Countrys)
                .HasForeignKey(e => e.id_countrys)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_DEPO
            modelBuilder.Entity<Directory_DEPO>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithOptional(e => e.Directory_DEPO)
                .HasForeignKey(e => e.code_depo);
            #endregion

            #region Directory_DetentionReturn
            modelBuilder.Entity<Directory_DetentionReturn>()
                .HasMany(e => e.OutgoingDetentionReturn)
                .WithRequired(e => e.Directory_DetentionReturn)
                .HasForeignKey(e => e.id_detention_return)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_Divisions
            modelBuilder.Entity<Directory_Divisions>()
                .HasMany(e => e.Directory_Divisions1)
                .WithOptional(e => e.Directory_Divisions2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<Directory_Divisions>()
                .HasMany(e => e.Directory_Ways)
                .WithOptional(e => e.Directory_Divisions)
                .HasForeignKey(e => e.id_devision);

            modelBuilder.Entity<Directory_Divisions>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_Divisions)
                .HasForeignKey(e => e.id_division_on_amkr);

            modelBuilder.Entity<Directory_Divisions>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithOptional(e => e.Directory_Divisions)
                .HasForeignKey(e => e.id_division);
            #endregion

            #region Directory_ExternalStation
            modelBuilder.Entity<Directory_ExternalStation>()
                .HasMany(e => e.Arrival_UZ_Document)
                .WithOptional(e => e.Directory_ExternalStation)
                .HasForeignKey(e => e.code_stn_from);

            modelBuilder.Entity<Directory_ExternalStation>()
                .HasMany(e => e.Arrival_UZ_Document1)
                .WithOptional(e => e.Directory_ExternalStation1)
                .HasForeignKey(e => e.code_stn_to);

            modelBuilder.Entity<Directory_ExternalStation>()
                .HasMany(e => e.Outgoing_UZ_Document)
                .WithOptional(e => e.Directory_ExternalStation)
                .HasForeignKey(e => e.code_stn_from);

            modelBuilder.Entity<Directory_ExternalStation>()
                .HasMany(e => e.Outgoing_UZ_Document1)
                .WithOptional(e => e.Directory_ExternalStation1)
                .HasForeignKey(e => e.code_stn_to);

            modelBuilder.Entity<Directory_ExternalStation>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithOptional(e => e.Directory_ExternalStation)
                .HasForeignKey(e => e.code_stn_to);

            #endregion

            #region Directory_GenusWagons
            modelBuilder.Entity<Directory_GenusWagons>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_GenusWagons)
                .HasForeignKey(e => e.id_genus_wagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_GenusWagons>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithRequired(e => e.Directory_GenusWagons)
                .HasForeignKey(e => e.id_genus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_GenusWagons>()
                .HasMany(e => e.Directory_Wagons)
                .WithRequired(e => e.Directory_GenusWagons)
                .HasForeignKey(e => e.id_genus)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_HazardClass
            modelBuilder.Entity<Directory_HazardClass>()
                .Property(e => e.code)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Directory_HazardClass>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_HazardClass)
                .HasForeignKey(e => e.danger);
            #endregion

            #region Directory_InlandRailway
            modelBuilder.Entity<Directory_InlandRailway>()
                .HasMany(e => e.Directory_BorderCheckpoint)
                .WithRequired(e => e.Directory_InlandRailway)
                .HasForeignKey(e => e.code_inlandrailway)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_InlandRailway>()
                .HasMany(e => e.Directory_ExternalStation)
                .WithRequired(e => e.Directory_InlandRailway)
                .HasForeignKey(e => e.code_inlandrailway)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_LessorsWagons
            modelBuilder.Entity<Directory_LessorsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_LessorsWagons)
                .HasForeignKey(e => e.id_lessor_wagon);
            #endregion

            #region Directory_LimitingLoading
            modelBuilder.Entity<Directory_LimitingLoading>()
                .HasMany(e => e.Directory_WagonsRent)
                .WithOptional(e => e.Directory_LimitingLoading)
                .HasForeignKey(e => e.id_limiting);
            #endregion

            #region ЛОКОМОТИВЫ Directory_Locomotive Directory_LocomotiveStatus
            modelBuilder.Entity<Directory_Locomotive>()
                .HasMany(e => e.WagonInternalOperation)
                .WithOptional(e => e.Directory_Locomotive)
                .HasForeignKey(e => e.locomotive1);

            modelBuilder.Entity<Directory_Locomotive>()
                .HasMany(e => e.WagonInternalOperation1)
                .WithOptional(e => e.Directory_Locomotive1)
                .HasForeignKey(e => e.locomotive2);

            modelBuilder.Entity<Directory_LocomotiveStatus>()
                .HasMany(e => e.Directory_Locomotive)
                .WithRequired(e => e.Directory_LocomotiveStatus)
                .HasForeignKey(e => e.id_locomotive_status)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_OperatorsWagons
            // Морс
            modelBuilder.Entity<Directory_OperatorsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_OperatorsWagons)
                .HasForeignKey(e => e.id_operator_wagon);
            // BLC
            modelBuilder.Entity<Directory_OperatorsWagons>()
                .HasMany(e => e.Directory_Wagons)
                .WithOptional(e => e.Directory_OperatorsWagons)
                .HasForeignKey(e => e.id_operator);

            modelBuilder.Entity<Directory_OperatorsWagons>()
                .HasMany(e => e.Directory_WagonsRent)
                .WithOptional(e => e.Directory_OperatorsWagons)
                .HasForeignKey(e => e.id_operator);


            #endregion

            #region Directory_OuterWays

            #endregion

            #region Directory_OwnersWagons
            modelBuilder.Entity<Directory_OwnersWagons>()
                .HasMany(e => e.Directory_Wagons)
                .WithRequired(e => e.Directory_OwnersWagons)
                .HasForeignKey(e => e.id_owner)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_OwnersWagons>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithRequired(e => e.Directory_OwnersWagons)
                .HasForeignKey(e => e.id_owner)
                .WillCascadeOnDelete(false);
            // МОРС
            modelBuilder.Entity<Directory_OwnersWagons>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_OwnersWagons)
                .HasForeignKey(e => e.id_owner_wagon)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_ParkWays
            modelBuilder.Entity<Directory_ParkWays>()
                .HasMany(e => e.Directory_OuterWays)
                .WithOptional(e => e.Directory_ParkWays)
                .HasForeignKey(e => e.id_park_from);

            modelBuilder.Entity<Directory_ParkWays>()
                .HasMany(e => e.Directory_Ways)
                .WithRequired(e => e.Directory_ParkWays)
                .HasForeignKey(e => e.id_park)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_ParkWays>()
                .HasMany(e => e.Directory_OuterWays1)
                .WithOptional(e => e.Directory_ParkWays1)
                .HasForeignKey(e => e.id_park_on);
            #endregion

            #region Directory_PayerArrival - ПОКА НЕИСПОЛЬЗУЮ

            #endregion

            #region Directory_PayerSender
            modelBuilder.Entity<Directory_PayerSender>()
                 .HasMany(e => e.Arrival_UZ_Document)
                 .WithOptional(e => e.Directory_PayerSender)
                 .HasForeignKey(e => e.code_payer_sender);

            modelBuilder.Entity<Directory_PayerSender>()
                .HasMany(e => e.Outgoing_UZ_Document)
                .WithOptional(e => e.Directory_PayerSender)
                .HasForeignKey(e => e.code_payer);
            #endregion

            #region Directory_Railway
            modelBuilder.Entity<Directory_Railway>()
                .HasMany(e => e.Directory_InlandRailway)
                .WithRequired(e => e.Directory_Railway)
                .HasForeignKey(e => e.code_railway)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_Reason_Discrepancy - подключить
            modelBuilder.Entity<Directory_Reason_Discrepancy>()
                .HasMany(e => e.OutgoingCars)
                .WithOptional(e => e.Directory_Reason_Discrepancy)
                .HasForeignKey(e => e.id_reason_discrepancy_uz);

            modelBuilder.Entity<Directory_Reason_Discrepancy>()
                .HasMany(e => e.OutgoingCars1)
                .WithOptional(e => e.Directory_Reason_Discrepancy1)
                .HasForeignKey(e => e.id_reason_discrepancy_amkr);
            #endregion

            #region Directory_Shipper
            modelBuilder.Entity<Directory_Shipper>()
                .HasMany(e => e.Arrival_UZ_Document)
                .WithOptional(e => e.Directory_Shipper)
                .HasForeignKey(e => e.code_shipper);

            modelBuilder.Entity<Directory_Shipper>()
                .HasMany(e => e.Outgoing_UZ_Document)
                .WithOptional(e => e.Directory_Shipper)
                .HasForeignKey(e => e.code_consignee);
            #endregion

            #region Directory_Station
            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_Station)
                .HasForeignKey(e => e.id_station_on_amkr);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.ArrivalSostav)
                .WithOptional(e => e.Directory_Station)
                .HasForeignKey(e => e.id_station_from);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.ArrivalSostav1)
                .WithOptional(e => e.Directory_Station1)
                .HasForeignKey(e => e.id_station_on);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.Directory_Ways)
                .WithRequired(e => e.Directory_Station)
                .HasForeignKey(e => e.id_station)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.WagonInternalMovement)
                .WithRequired(e => e.Directory_Station)
                .HasForeignKey(e => e.id_station)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.Directory_OuterWays)
                .WithRequired(e => e.Directory_Station)
                .HasForeignKey(e => e.id_station_on)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.Directory_OuterWays1)
                .WithRequired(e => e.Directory_Station1)
                .HasForeignKey(e => e.id_station_from)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.OutgoingSostav)
                .WithRequired(e => e.Directory_Station)
                .HasForeignKey(e => e.id_station_from)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.OutgoingSostav1)
                .WithOptional(e => e.Directory_Station1)
                .HasForeignKey(e => e.id_station_on);

            #endregion

            #region Directory_TypeDivision
            modelBuilder.Entity<Directory_TypeDivision>()
                .HasMany(e => e.Directory_Divisions)
                .WithRequired(e => e.Directory_TypeDivision)
                .HasForeignKey(e => e.id_type_devision)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_TypeOwnerShip

            //ИДС
            modelBuilder.Entity<Directory_TypeOwnerShip>()
                .HasMany(e => e.Directory_Wagons)
                .WithOptional(e => e.Directory_TypeOwnerShip)
                .HasForeignKey(e => e.id_type_ownership);
            // МОРС
            modelBuilder.Entity<Directory_TypeOwnerShip>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_TypeOwnerShip)
                .HasForeignKey(e => e.id_type_ownership)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_TypeWagons
            // ИДС
            modelBuilder.Entity<Directory_TypeWagons>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithOptional(e => e.Directory_TypeWagons)
                .HasForeignKey(e => e.id_type);
            // МОРС
            modelBuilder.Entity<Directory_TypeWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_TypeWagons)
                .HasForeignKey(e => e.id_type_wagon);
            #endregion

            #region Справочник состояний загрузок Directory_WagonLoadingStatus
            modelBuilder.Entity<Directory_WagonLoadingStatus>()
                .HasMany(e => e.WagonInternalOperation)
                .WithRequired(e => e.Directory_WagonLoadingStatus)
                .HasForeignKey(e => e.id_loading_status)
                .WillCascadeOnDelete(false);
            #endregion

            #region Справочник операций над вагонами Directory_WagonOperations
            modelBuilder.Entity<Directory_WagonOperations>()
                .HasMany(e => e.WagonInternalOperation)
                .WithRequired(e => e.Directory_WagonOperations)
                .HasForeignKey(e => e.id_operation)
                .WillCascadeOnDelete(false);
            #endregion

            #region Справочник вагонов Directory_Wagons
            modelBuilder.Entity<Directory_Wagons>()
                .HasMany(e => e.Arrival_UZ_Vagon)
                .WithRequired(e => e.Directory_Wagons)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Wagons>()
                .HasMany(e => e.Directory_WagonsRent)
                .WithRequired(e => e.Directory_Wagons)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Wagons>()
                .HasMany(e => e.WagonInternalRoutes)
                .WithRequired(e => e.Directory_Wagons)
                .WillCascadeOnDelete(false);
            #endregion


            #region Directory_WagonsRent

            modelBuilder.Entity<Directory_WagonsRent>()
                .HasMany(e => e.Directory_WagonsRent1)
                .WithOptional(e => e.Directory_WagonsRent2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<Directory_WagonsRent>()
                .HasMany(e => e.Outgoing_UZ_Vagon)
                .WithOptional(e => e.Directory_WagonsRent)
                .HasForeignKey(e => e.id_wagons_rent_arrival);

            modelBuilder.Entity<Directory_WagonsRent>()
                .HasMany(e => e.Outgoing_UZ_Vagon1)
                .WithOptional(e => e.Directory_WagonsRent1)
                .HasForeignKey(e => e.id_wagons_rent_outgoing);
            #endregion

            #region Directory_Ways
            modelBuilder.Entity<Directory_Ways>()
                .HasMany(e => e.ArrivalSostav)
                .WithOptional(e => e.Directory_Ways)
                .HasForeignKey(e => e.id_way);

            modelBuilder.Entity<Directory_Ways>()
                .HasMany(e => e.Directory_OuterWays)
                .WithOptional(e => e.Directory_Ways)
                .HasForeignKey(e => e.id_way_from);

            modelBuilder.Entity<Directory_Ways>()
                .HasMany(e => e.Directory_OuterWays1)
                .WithOptional(e => e.Directory_Ways1)
                .HasForeignKey(e => e.id_way_on);

            modelBuilder.Entity<Directory_Ways>()
                .HasMany(e => e.OutgoingSostav)
                .WithRequired(e => e.Directory_Ways)
                .HasForeignKey(e => e.id_way_from)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Ways>()
                .HasMany(e => e.WagonInternalMovement)
                .WithRequired(e => e.Directory_Ways)
                .HasForeignKey(e => e.id_way)
                .WillCascadeOnDelete(false);
            #endregion

            #endregion



            #region СПРАВОЧНИКИ МОРС

            #region Directory_ModelsWagons
            modelBuilder.Entity<Directory_ModelsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_ModelsWagons)
                .HasForeignKey(e => e.code_model_wagon);
            #endregion

            #region Directory_PoligonTravelWagons
            modelBuilder.Entity<Directory_PoligonTravelWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_PoligonTravelWagons)
                .HasForeignKey(e => e.id_poligon_travel_wagon);
            #endregion

            #region Directory_SpecialConditions
            modelBuilder.Entity<Directory_SpecialConditions>()
                    .HasMany(e => e.CardsWagons)
                    .WithOptional(e => e.Directory_SpecialConditions)
                    .HasForeignKey(e => e.id_special_conditions);
            #endregion

            #region Directory_TypesRepairsWagons
            modelBuilder.Entity<Directory_TypesRepairsWagons>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithRequired(e => e.Directory_TypesRepairsWagons)
                .HasForeignKey(e => e.id_type_repair_wagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_TypesRepairsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_TypesRepairsWagons)
                .HasForeignKey(e => e.id_type_repairs)
                .WillCascadeOnDelete(false);
            #endregion

            #region Directory_WagonManufacturers
            modelBuilder.Entity<Directory_WagonManufacturers>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_WagonManufacturers)
                .HasForeignKey(e => e.id_wagon_manufacturer);
            #endregion

            #region Directory_WagonsCondition
            modelBuilder.Entity<Directory_WagonsCondition>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithOptional(e => e.Directory_WagonsCondition)
                .HasForeignKey(e => e.id_wagons_condition);
            #endregion

            #endregion

            #region MORS
            modelBuilder.Entity<WagonsMotionSignals>()
                .Property(e => e.ves)
                .HasPrecision(18, 3);

            modelBuilder.Entity<CardsWagons>()
                .HasMany(e => e.ParksListWagons)
                .WithRequired(e => e.CardsWagons)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ParksWagons>()
                .HasMany(e => e.ParksListWagons)
                .WithRequired(e => e.ParksWagons)
                .HasForeignKey(e => e.id_park_wagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CardsWagons>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithRequired(e => e.CardsWagons)
                .WillCascadeOnDelete(false);
            #endregion

        }
    }
}
